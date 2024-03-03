import Home from './page/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParams } from './interface/navigation';
import Vocabulary from './page/Vocabulary';
import Login from './page/Login';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name='Login' component={Login} /> */}
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Vocabulary' component={Vocabulary} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

