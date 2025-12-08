import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../ui/theme';
import CaptureScreen from '../screens/CaptureScreen';
import ResultScreen from "../screens/ResultScreen"
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
  Capture: undefined;
  Result: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Capture" screenOptions={{
        headerStyle: { backgroundColor: colors.bgAlt },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.bg },
      }}>
        <Stack.Screen name="Capture" component={CaptureScreen} options={{ title: 'Tamizaje Visual' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Resultados' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}