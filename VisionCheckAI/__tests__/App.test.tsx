import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-camera', () => ({ useCameraPermissions: () => [ { granted: false }, jest.fn() ] }));
jest.mock('react-redux', () => ({ Provider: ({ children }: any) => children }));

test('renderiza la app sin errores', () => {
  const App = require('../App').default;
  const tree = render(<App />);
  expect(tree.toJSON()).toBeTruthy();
});
