import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('expo-camera', () => ({ useCameraPermissions: () => [ { granted: false }, jest.fn() ] }));
jest.mock('react-redux', () => ({ Provider: ({ children }: any) => children }));

test('renderiza la app sin errores', () => {
  const tree = render(<App />);
  expect(tree.toJSON()).toBeTruthy();
});