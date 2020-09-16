import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import ProfileEdit from './pages/ProfileEdit';

const { persistor, store } = configureStore();

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Riwayat Pesanan" component={History} />
            <Stack.Screen name="Ubah Profil" component={ProfileEdit} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
