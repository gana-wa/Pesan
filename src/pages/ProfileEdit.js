import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../redux/actions/auth';

const ProfileEdit = ({ navigation: { goBack } }) => {

   const dispatch = useDispatch();

   const stateAuth = useSelector(state => state.auth.user);

   const [form, setForm] = useState({
      name: stateAuth.name,
      telp: stateAuth.telp,
   });

   const [fromState, setFromState] = useState({
      name: stateAuth.name,
      telp: stateAuth.telp,
   });

   const handleSubmit = () => {
      dispatch(editUser(stateAuth.id, form));
      alert('Edited');
      goBack();
   };

   return (
      <View style={styles.container}>
         <View>
            <View style={styles.listContainer}>
               <Text style={styles.textLabel}>Nama Lengkap</Text>
               <TextInput style={styles.textInput} placeholder="Nama" defaultValue={stateAuth.name} onChangeText={text => setForm({ ...form, name: text })} />
               {/* <Text>Nama harus diisi</Text> */}
            </View>
            <View style={styles.listContainer}>
               <Text style={styles.textLabel}>Nomer telepon</Text>
               <TextInput maxLength={12} keyboardType={'numeric'} textContentType={'telephoneNumber'} style={styles.textInput} placeholder="No. HP" defaultValue={stateAuth.telp} onChangeText={text => setForm({ ...form, telp: text })} />
               {/* <Text>Nama harus diisi</Text> */}
            </View>
         </View>
         <View>
            {fromState.name === form.name && fromState.telp === form.telp ? (
               <View style={styles.buttonSubmitDisabled}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>SIMPAN</Text>
               </View>
            ) : (
                  <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                     <Text style={{ color: '#fff', fontWeight: 'bold' }}>SIMPAN</Text>
                  </Pressable>
               )}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginTop: 30,
      flex: 1,
      justifyContent: 'space-between',
   },
   listContainer: {
      backgroundColor: '#fff',
      borderBottomWidth: 0.3,
      borderColor: '#95a5a6',
      paddingHorizontal: 10,
      paddingVertical: 15,
   },
   textLabel: {
      marginHorizontal: 4,
      fontWeight: 'bold',
   },
   textInput: {
      // marginHorizontal: 6,
      fontSize: 18,
      fontWeight: 'bold',
   },
   buttonSubmit: {
      backgroundColor: '#27ae60',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
   },
   buttonSubmitDisabled: {
      backgroundColor: '#95a5a6',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
   }
});

export default ProfileEdit;
