import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registered } from '../redux/actions/auth';

const Register = ({ navigation }) => {
   const [formRespone, setFormResponse] = useState({
      name: '',
      telp: '',
      password: '',
      level_id: 2,
   });
   const [status, setStatus] = useState('');
   const [isRegistered, setRegistered] = useState(false);
   const dispatch = useDispatch();

   const { msg, isLoggedIn } = useSelector(
      (state) => state.auth
   );

   useEffect(() => {
      if (isRegistered) {
         dispatch(registered(formRespone));
         setRegistered(false);
      }
      if (isLoggedIn) {
         return navigation.navigate('Home');
      }
      setStatus(msg);
   }, [formRespone, dispatch, isRegistered, msg, isLoggedIn, navigation]);

   const handleSubmit = () => {
      setRegistered(true);
   };

   return (
      <View style={styles.container}>
         <View style={styles.containerLogin}>
            <Text style={styles.loginBanerText}>Buat daftar, lengkapi data dirimu di bawah ya</Text>
            <Text style={styles.labelText}>Nama Lengkap</Text>
            <TextInput style={styles.loginFormText} placeholder={'Cth: Broto'} onChangeText={text => setFormResponse({ ...formRespone, name: text })} />
            <Text style={styles.labelText}>Nomor HP</Text>
            <TextInput maxLength={12} keyboardType={'numeric'} textContentType={'telephoneNumber'} style={styles.loginFormText} placeholder={'Cth: 081234567'} onChangeText={text => setFormResponse({ ...formRespone, telp: text })} />
            <Text style={styles.labelText}>Password</Text>
            <TextInput style={styles.loginFormText} onChangeText={text => setFormResponse({ ...formRespone, password: text })} secureTextEntry placeholder={'Password minimal 3 karakter'} />
            <Text>{status}</Text>
         </View>
         <View>
            {formRespone.telp.length > 7 && formRespone.password.length > 3 && formRespone.name.length > 0 ? (
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
   labelText: {
      fontWeight: 'bold',
      marginTop: 20,
   },
   loginFormText: {
      fontSize: 16,
      fontWeight: 'bold',
      borderBottomWidth: 0.3,
      borderColor: '#95a5a6',
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

export default Register;
