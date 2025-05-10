// tests/agis-compliance.spec.js
describe('AGIS 3.3 Investigation Planning Compliance', () => {
    test('Case timelines enforce review intervals', async () => {
      const testCase = await createTestCase()
      const update = await updateCaseStatus(testCase.id, 'under-review')
      expect(update.nextReviewDate).toBeWithin7Days()
    })
  
    test('Evidence chain-of-custody logging', async () => {
      const evidence = await uploadTestEvidence()
      const logEntry = await getAuditLog(evidence.id)
      expect(logEntry).toMatchObject({
        action: 'UPLOAD',
        user: 'test-investigator',
        integrityHash: expect.any(String)
      })
    })
  })