import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { Picker } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';

import defaultImage from '../assets/img/default.jpg';

const AddMenu = ({ navigation }) => {
   const category = useSelector(state => state.menu.category);

   const handleImgPick = () => {
      const options = {
         title: 'Select Picture',
         // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
         storageOptions: {
            skipBackup: true,
            path: 'images',
         },
         noData: true,
      };

      ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
            console.log('User cancelled image picker');
         } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
         } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
         } else {
            const source = response;
            setFormResponse({ ...formRespone, image: source });
         }
      });
   };

   const [formRespone, setFormResponse] = useState({
      product_name: '',
      price: '',
      category_id: '',
      image: '',
   });

   const handleSubmit = () => {
      let formData = new FormData();
      formData.append('product_name', formRespone.product_name);
      formData.append('price', Number(formRespone.price));
      formData.append('category_id', formRespone.category_id);
      formData.append('image', {
         uri: `file://${formRespone.image.path}`,
         type: formRespone.image.type,
         name: formRespone.image.fileName,
         size: formRespone.image.fileSize,
      });

      const configHeader = {
         headers: {
            'content-type': 'multipart/form-data',
            contentType: false,
            mimeType: 'multipart/form-data',
            'cache-control': 'no-cache',
            accept: 'application/json',
            // "x-access-token":
            // "Bearer toke",
         },
      };

      // const localhost = 'http://192.168.1.13:8000';
      const localhost = 'http://192.168.43.42:8000';

      // console.log(formData);

      const URLString = `${localhost}/products`;
      setFormResponse({
         product_name: '',
         price: '',
         category_id: '',
         image: '',
      });

      Axios.post(URLString, formData, configHeader)
         .then((res) => {
            navigation.navigate('Home');
            alert(res.data.data.msg);
            // console.log(res);
         })
         .catch(err => console.log(err));
   };

   return (
      <View style={styles.container}>
         <View style={styles.containerForm}>
            <View style={{ alignItems: 'center' }}>
               <Pressable onPress={() => handleImgPick()}>
                  {formRespone.image.length < 1 ? (
                     <Image source={defaultImage} style={{ width: 100, height: 100, borderRadius: 10 }} />
                  ) : (
                        <Image source={formRespone.image} style={{ width: 100, height: 100, borderRadius: 10 }} />
                     )}
               </Pressable>
               <Text style={{ fontStyle: 'italic', fontSize: 12 }}>(Ukuran poto maks 2 mb)</Text>
            </View>
            <Text style={styles.labelText}>Nama menu</Text>
            <TextInput style={styles.loginFormText} placeholder={'Nama menu harus diisi'} onChangeText={text => setFormResponse({ ...formRespone, product_name: text })} />
            <Text style={styles.labelText}>Kategori</Text>
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
            {formRespone.product_name.length < 1 || formRespone.price.length < 3 || formRespone.category_id.length < 1 || formRespone.image.length < 1 ? (
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
   containerForm: {
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
