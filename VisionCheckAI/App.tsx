import { Provider } from 'react-redux';
import RootNavigator from './src/navigation';
import { store } from './src/state/store';
import ErrorBoundary from './src/ui/ErrorBoundary';

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RootNavigator />
      </ErrorBoundary>
    </Provider>
  );
}
