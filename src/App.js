import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, Image, View, Pressable, Button } from 'react-native';
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
            <Stack.Screen name="Home" component={Home}
              options={{
                headerStyle: {
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen name="Menu" component={Menu}
              options={({ route }) => ({
                title: route.params.categoryName,
              })}
            />
            <Stack.Screen name="Cart" component={Cart} options={{ title: 'Pesanan' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
            <Stack.Screen name="History" component={History} options={{ title: 'Riwayat Pesanan' }} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{
              title: 'Ubah Profil',
              // headerRight: () => (
              //   <Pressable style={{ backgroundColor: '#27ae60', marginRight: 15, width: 80, height: '50%', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} onPress={() => alert('SIMPAN')}>
              //     <Text style={{ color: '#fff', fontWeight: 'bold' }}>SIMPAN</Text>
              //   </Pressable>
              // ),
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
