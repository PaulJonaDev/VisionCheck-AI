import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-camera', () => ({
  useCameraPermissions: () => [{ granted: false }, jest.fn() as jest.Mock],
}));
import { jest } from '@jest/globals';
jest.mock('react-redux', () => ({ Provider: ({ children }: any) => children }));

import { test } from '@jest/globals';
test('render; la app sin errores', () => {
  const App = require('../App').default;
  const tree = render(<App />);
const { expect } = require('@jest/globals');
  expect(tree.toJSON()).toBeTruthy();


});