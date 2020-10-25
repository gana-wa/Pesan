import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
   const { isLoggedIn } = useSelector(
      (state) => state.auth
   );

   useEffect(() => {
      setTimeout(() => {
         if (isLoggedIn) {
            return navigation.reset({
               index: 0,
               routes: [{ name: 'Home' }],
            });
         } else {
            return navigation.reset({
               index: 0,
               routes: [{ name: 'Login' }],
            });
         }
      }, 1000);
   }, [isLoggedIn, navigation]);

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.title}>Pesan Nakam</Text>
      </SafeAreaView>
   );
};

export default SplashScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#27ae60',
   },
});
