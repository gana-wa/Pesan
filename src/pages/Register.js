import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

const Register = () => {
   return (
      <View style={styles.container}>
         <View style={styles.containerLogin}>
            <Text style={styles.loginBanerText}>Silahkan masuk dengan nomer HP-mu yang terdaftar</Text>
            <TextInput maxLength={12} keyboardType={'numeric'} textContentType={'telephoneNumber'} style={styles.loginFormText} placeholder={'Nomer HP'} />
            <TextInput style={styles.loginFormText} secureTextEntry placeholder={'Password'} />
         </View>
         <View>
            <Pressable>
               <View style={styles.buttonLogin}>
                  <Text style={styles.buttonLoginText}>LANJUT</Text>
               </View>
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
   },
   containerLogin: {
      paddingHorizontal: 15,
      marginTop: 20,
   },
   loginBanerText: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   loginFormText: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   buttonLogin: {
      backgroundColor: '#27ae60',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
   },
   buttonLoginText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
   },
});

export default Register;
