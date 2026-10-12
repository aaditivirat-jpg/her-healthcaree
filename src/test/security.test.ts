import { describe, it, expect, beforeEach } from 'vitest';
import { 
  fetchPeriodRecords, 
  savePeriodRecord, 
  deletePeriodRecord,
  deleteUserData 
} from '../lib/storage';

// Provide standard in-memory localStorage mock for node test runner
const memoryStorage = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => memoryStorage.get(key) || null,
  setItem: (key: string, val: string) => memoryStorage.set(key, String(val)),
  removeItem: (key: string) => memoryStorage.delete(key),
  clear: () => memoryStorage.clear(),
};

// Polyfill globalThis.localStorage
(globalThis as any).localStorage = mockLocalStorage;

// Storage security and RLS simulation tests
describe('Data Security, Tenant Isolation & User Rights Verification', () => {

  const userA = 'user_ananya_uuid_101';
  const userB = 'user_priya_uuid_202';

  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('enforces strict isolation: User A cannot read User B records', async () => {
    // Save record for User B
    await savePeriodRecord({
      userId: userB,
      startDate: '2026-02-14',
      flow: 'medium',
      symptoms: ['cramps'],
      notes: 'Priya private confidential health notes',
    });

    // Save record for User A
    await savePeriodRecord({
      userId: userA,
      startDate: '2026-03-01',
      flow: 'light',
      symptoms: ['bloating'],
      notes: 'Ananya personal diary',
    });

    // Fetch records as User A
    const recordsA = await fetchPeriodRecords(userA);
    expect(recordsA.length).toBe(1);
    expect(recordsA[0].userId).toBe(userA);
    expect(recordsA[0].notes).toBe('Ananya personal diary');

    // Confirm User A query returned 0 of User B's data
    const leakedRecords = recordsA.filter(r => r.userId === userB);
    expect(leakedRecords.length).toBe(0);
  });

  it('prevents unauthorized modification: User A cannot edit User B records', async () => {
    // User B creates a record
    const recordB = await savePeriodRecord({
      userId: userB,
      startDate: '2026-01-10',
      flow: 'heavy',
      symptoms: ['fatigue'],
      notes: 'Private to User B',
    });

    // User A attempts to overwrite User B's record
    await expect(async () => {
      await savePeriodRecord(
        {
          userId: userA, // User A claiming ownership
          startDate: '2026-01-10',
          flow: 'spotting',
          symptoms: [],
          notes: 'Tampered notes',
        },
        recordB.id
      );
    }).rejects.toThrow('Record not found or access denied');

    // Confirm User B's record remains untampered
    const recordsB = await fetchPeriodRecords(userB);
    expect(recordsB[0].notes).toBe('Private to User B');
  });

  it('prevents unauthorized deletion: User A cannot delete User B records', async () => {
    const recordB = await savePeriodRecord({
      userId: userB,
      startDate: '2026-01-15',
      symptoms: [],
    });

    // User A attempts to delete recordB
    await deletePeriodRecord(userA, recordB.id);

    // Record B must still exist
    const recordsB = await fetchPeriodRecords(userB);
    expect(recordsB.length).toBe(1);
    expect(recordsB[0].id).toBe(recordB.id);
  });

  it('executes complete erasure: user self-deletion purges all personal records', async () => {
    await savePeriodRecord({
      userId: userA,
      startDate: '2026-02-01',
      symptoms: ['headache'],
    });

    const before = await fetchPeriodRecords(userA);
    expect(before.length).toBe(1);

    // Purge data per Right to Erasure
    await deleteUserData(userA);

    const after = await fetchPeriodRecords(userA);
    expect(after.length).toBe(0);
  });

});
