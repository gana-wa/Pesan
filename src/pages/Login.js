import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from '../redux/actions/auth';

const Login = ({ navigation }) => {
   const [formRespone, setFormResponse] = useState({
      telp: '',
      password: '',
   });
   const [status, setStatus] = useState('');
   const [logIn, setLogIn] = useState(false);
   const dispatch = useDispatch();

   const { msg, isLoggedIn } = useSelector(
      (state) => state.auth
   );

   useEffect(() => {
      if (logIn) {
         dispatch(loggedIn(formRespone));
         setLogIn(false);
      }
      if (isLoggedIn) {
         return navigation.navigate('Home');
      }
      setStatus(msg);
   }, [formRespone, dispatch, logIn, msg, isLoggedIn, navigation]);

   // useEffect(() => {
   //    // if (msg) {
   //    setStatus(msg);
   //    // }
   // }, [msg]);

   const handleSubmit = () => {
      setLogIn(true);
   };

   return (
      <View style={styles.container}>
         <View style={styles.containerLogin}>
            <Pressable onPress={() => navigation.navigate('Register')}>
               <View style={styles.imageLoginContainer}>
                  <Text style={{ color: '#fff' }}>(Register)</Text>
               </View>
            </Pressable>
            <Text style={styles.loginBanerText}>Silahkan masuk dengan nomer HP-mu yang terdaftar</Text>
            <TextInput maxLength={12} keyboardType={'numeric'} textContentType={'telephoneNumber'} style={styles.loginFormText} placeholder={'Nomer HP'} onChangeText={text => setFormResponse({ ...formRespone, telp: text })} />
            <TextInput style={styles.loginFormText} onChangeText={text => setFormResponse({ ...formRespone, password: text })} secureTextEntry placeholder={'Password'} />
            <Text>{status}</Text>
         </View>
         <View>
            {formRespone.telp.length > 7 && formRespone.password.length > 3 ? (
               <Pressable onPress={handleSubmit}>
                  <View style={styles.buttonLogin}>
                     <Text style={styles.buttonLoginText}>LANJUT</Text>
                  </View>
               </Pressable>
            ) : (
                  <View style={styles.buttonLoginDisabled}>
                     <Text style={styles.buttonLoginText}>LANJUT</Text>
                  </View>
               )}
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
   imageLoginContainer: {
      backgroundColor: '#f39c12',
      width: 100,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
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
   buttonLoginDisabled: {
      backgroundColor: '#95a5a6',
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

export default Login;
