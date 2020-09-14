import React from 'react';
import {
   View, Text, StyleSheet, TextInput, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import gambar from '../assets/img/gambar.jpg';
import soto from '../assets/img/soto.jpg';
import bev from '../assets/img/bev.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
               <Icon name="user" size={30} color="#7f8c8d" />
            </TouchableOpacity>
         </View>
         <View style={style.content}>
            <View style={style.carousel}>
               <Text style={style.carouselText}>Space disewakan</Text>
            </View>
            <View style={style.listCategoryContainer} >
               <Text style={style.textCategory}>Category</Text>
               <FlatGrid
                  itemDimension={130}
                  data={category}
                  renderItem={({ item }) => (
                     <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                        <View style={style.cardCategory}>
                           <Image source={item.image} style={style.cardCategoryImg} />
                           <Text style={style.cardCategoryText}>{item.name}</Text>
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
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
   },
   searchHeader: {
      // paddingVertical: 5,
      height: '70%',
      width: '85%',
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
      justifyContent: 'center',
   },
   carouselText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
   },
   cardCategory: {
      alignItems: 'center',
      borderRadius: 8,
   },
   cardCategoryImg: {
      height: 130,
      width: 130,
      borderRadius: 8,
   },
   cardCategoryText: {
      fontSize: 14,
   },
   listCategoryContainer: {
      flex: 5,
   },
   textCategory: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
   },
});

export default Home;
