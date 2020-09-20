import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import { Picker } from '@react-native-community/picker';
// import { Picker } from 'react-native';
import { useSelector } from 'react-redux';
import { Picker } from "native-base";
const AddMenu = () => {
   const category = useSelector(state => state.menu.category);

   const [formRespone, setFormResponse] = useState({
      product_name: '',
      price: '',
      category_id: '',
      image: '',
   });

   const handleSubmit = () => {
      console.log(formRespone);
   };

   return (
      <View style={styles.container}>
         <View style={styles.containerLogin}>
            <Text style={styles.labelText}>Nama menu</Text>
            <TextInput style={styles.loginFormText} placeholder={'Nama menu harus diisi'} onChangeText={text => setFormResponse({ ...formRespone, product_name: text })} />
            <Text style={styles.labelText}>Kategori</Text>
            {/* <TextInput style={styles.loginFormText} placeholder={'Cth: 081234567 (min 7 digit)'} onChangeText={text => setFormResponse({ ...formRespone, telp: text })} /> */}
            {/* <Picker
               style={{ height: 50, width: 100 }}
               mode="dropdown"
               onValueChange={(itemValue) => {
                  setFormResponse({ category_id: itemValue });
               }}
            >
               {category.map((item) => {
                  return <Picker.Item label={item.category_name} value={item.category_id} />;
               })}
            </Picker> */}
            <Picker
               mode="dialog"
               selectedValue={formRespone.category_id}
               onValueChange={(value) => setFormResponse({ ...formRespone, category_id: value })}
               placeholder="Select"
            >
               <Picker.Item label="Pilih Kategory" value="" />
               {category.map(item => {
                  return <Picker.Item label={item.category_name} value={item.category_id} key={item.category_id} />;
               })}
            </Picker>
            <Text style={styles.labelText}>Harga (tidak termasuk pajak)</Text>
            <TextInput maxLength={12} keyboardType={'numeric'} style={styles.loginFormText} onChangeText={text => setFormResponse({ ...formRespone, price: text })} placeholder={'Min 100'} />
         </View>
         <View>
            {formRespone.product_name.length < 1 || formRespone.price.length < 3 || formRespone.category_id.length < 1 ? (
               <View style={styles.buttonLoginDisabled}>
                  <Text style={styles.buttonLoginText}>SIMPAN</Text>
               </View>
            ) : (
                  <Pressable onPress={handleSubmit}>
                     <View style={styles.buttonLogin}>
                        <Text style={styles.buttonLoginText}>SIMPAN</Text>
                     </View>
                  </Pressable>
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

export default AddMenu;
