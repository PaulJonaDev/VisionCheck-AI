import { explain } from '../src/services/explanation';
import { expect, test } from '@jest/globals';

test('genera hipótesis y recomendación', () => {
  const res = explain([
    { pattern: 'enrojecimiento', confidence: 0.5, severity: 'media' },
    { pattern: 'fatiga', confidence: 0.6, severity: 'alta' },
  ]);
  expect(res.hypotheses.length).toBeGreaterThan(0);



  expect(res.recommendation.callToAction).toBeTruthy();

  expect(typeof res.lensProbability).toBe('number');
});