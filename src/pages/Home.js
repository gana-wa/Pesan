import React, { useEffect, useState } from 'react';
import {
   View, Text, StyleSheet, TextInput, Image, Dimensions, TouchableOpacity, Pressable
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';

import { fetchCategory } from '../redux/actions/menu';

import gambar from '../assets/img/gambar.jpg';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import userIcon from '../assets/icon/user.png';

const Home = ({ route, navigation }) => {
   // const localhost = '192.168.1.137';
   const localhost = '192.168.43.42';

   const [searchKey, setSearchKey] = useState('');

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchCategory());
   }, [dispatch]);

   const stateCategory = useSelector(state => state.menu.category);
   const stateAuth = useSelector(state => state.auth.user);

   return (
      <View style={style.container}>
         <View style={style.header}>
            {Number(stateAuth.level_id) === 1 ? (
               <Pressable
                  style={{ width: 40, height: 40, borderWidth: 1.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => navigation.navigate('AddMenu')}
               >
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>+</Text>
               </Pressable>
            ) : (null)}
            <TextInput
               style={style.searchHeader}
               placeholder={'Mau makan apa hari ini?'}
               onChangeText={value => setSearchKey(value)}
               onSubmitEditing={() => {
                  navigation.navigate('Menu', { isSearch: true, searchKey: searchKey });
               }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
               <Image source={userIcon} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
         </View>
         <View style={style.content}>
            <View style={style.carousel}>
               <Text style={style.carouselText}>Tempat Carousel</Text>
               <Text style={style.carouselText2}>(Coming soon)</Text>
            </View>
            <View style={style.listCategoryContainer} >
               <Text style={style.textCategory}>Category</Text>
               <TouchableOpacity onPress={() => navigation.navigate('Menu', { categoryId: null, categoryName: 'All Menu' })}>
                  <View style={style.cardCategory}>
                     <Image source={gambar} style={style.cardCategoryImg} />
                     <Text style={style.cardCategoryText}>All Category</Text>
                  </View>
               </TouchableOpacity>
               <FlatGrid
                  itemDimension={130}
                  data={stateCategory}
                  renderItem={({ item }) => (
                     <TouchableOpacity onPress={() => navigation.navigate('Menu', { categoryId: item.category_id, categoryName: item.category_name })}>
                        <View style={style.cardCategory}>
                           <Image source={{ uri: item.image.replace('localhost', localhost) }} style={style.cardCategoryImg} />
                           <Text style={style.cardCategoryText}>{item.category_name}</Text>
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
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
   },
   searchHeader: {
      // paddingVertical: 5,
      height: '70%',
      // width: '85%',
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
   carouselText2: {
      color: '#fff',
      fontSize: 14,
      textAlign: 'center',
      fontStyle: 'italic',
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
