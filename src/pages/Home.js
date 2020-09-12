import React from 'react';
import {
   View, Text, StyleSheet, TextInput, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import gambar from '../assets/img/gambar.jpg';
import soto from '../assets/img/soto.jpg';
import bev from '../assets/img/bev.jpg';
import { FlatGrid } from 'react-native-super-grid';

const category = [
   { name: 'Food', image: soto },
   { name: 'Beverage', image: bev },
   { name: 'All Menus', image: gambar },
];

const Home = ({ navigation }) => {
   return (
      <View style={style.container}>
         <View style={style.header}>
            <TextInput
               style={style.searchHeader}
               placeholder={'Mau makan apa hari ini?'}
            />
         </View>
         <View style={style.content}>
            <View style={style.carousel} />
            <View style={style.listCategory} >
               <Text style={style.textCategory}>Category</Text>
               <FlatGrid
                  itemDimension={130}
                  data={category}
                  renderItem={({ item }) => (
                     <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                        <View style={{ alignItems: 'center', borderRadius: 8 }}>
                           <Image source={item.image} style={{ height: 130, width: 130, borderRadius: 8 }} />
                           <Text style={{ fontSize: 14 }}>{item.name}</Text>
                        </View>
                     </TouchableOpacity>
                  )}
               />
            </View>
            {/* <View style={{ backgroundColor: '#2ecc71', flex: 2 }} /> */}
            {/* <View style={{ backgroundColor: '#2980b9', flex: 1 }} /> */}
         </View>
      </View>
   );
};

const { height } = Dimensions.get('screen');
const style = StyleSheet.create({
   container: {
      height: height,
      // flex: 1,
   },
   header: {
      flex: 1,
      // backgroundColor: '#bdc3c7',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
   },
   textHeader: {
      // textAlign: 'center',
   },
   searchHeader: {
      // paddingVertical: 5,
      height: '70%',
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 20,
   },
   content: {
      flex: 10,
      // marginHorizontal: 10,
   },
   carousel: {
      backgroundColor: '#e74c3c',
      flex: 2,
   },
   listCategory: {
      flex: 5,
   },
   textCategory: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
   },
});

export default Home;
