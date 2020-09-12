import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Image, Button, View, TouchableHighlight, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus } from '../redux/actions/menu';

const Item = ({ item, onPress, style }) => (
   <>
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
         <Image style={styles.menuImage} source={{ uri: item.image }} />
         <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.product_name}</Text>
            <Text style={styles.desc}>Deskripsi produk. Ini hanyalah sebagai contoh deskripsi produk</Text>
            <Pressable style={styles.buttonAdd} onPress={() => alert('Item added to cart')}>
               <Text style={styles.buttonAddText}>Beli</Text>
            </Pressable>
         </View>
      </TouchableOpacity>
   </>
);


const Menu = () => {
   const menu = useSelector(state => state.menu.menus);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchMenus());
   }, [dispatch]);
   // console.log(menu);

   const [selectedId, setSelectedId] = useState(null);

   const renderItem = ({ item }) => {
      const backgroundColor = item.product_id === selectedId ? '#6e3b6e' : '#fff';

      return (
         <Item
            item={item}
            onPress={() => setSelectedId(item.product_id)}
            style={{ backgroundColor }}
         />
      );
   };

   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={menu}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_id.toString()}
            extraData={selectedId}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // marginTop: StatusBar.currentHeight || 0,
   },
   item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
   },
   titleWrapper: {
      marginLeft: 15,
      flex: 1,
      justifyContent: 'space-between',
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   desc: {
      fontSize: 12,
      color: '#95a5a6',
      textAlign: 'justify',
   },
   menuImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
   },
   buttonAdd: {
      borderRadius: 5,
      backgroundColor: '#27ae60',
      width: 80,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonAddText: {
      color: 'white',
      fontWeight: 'bold',
   },
});

export default Menu;
