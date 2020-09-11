import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';

//pages
import Home from './pages/Home';
import Menu from './pages/Menu';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Menu" component={Menu} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
