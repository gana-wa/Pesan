import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Image, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus, addToCart, increaseQuantityCreator, decreaseQuantityCreator } from '../redux/actions/menu';

const Item = ({ item, onPress, style }) => {
   const stateMenu = useSelector(state => state.menu);
   const dispatch = useDispatch();
   const index = stateMenu.carts.findIndex(inCart => {
      return inCart.id === item.product_id;
   });
   return (
      <>
         <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Image style={styles.menuImage} source={{ uri: item.image }} />
            <View style={styles.titleWrapper}>
               <Text style={styles.title}>{item.product_name}</Text>
               <Text style={styles.desc}>Deskripsi produk. Ini hanyalah sebagai contoh deskripsi produk</Text>
               <Text style={styles.price}>{`Rp ${item.price.toLocaleString()}`}</Text>
               <View style={styles.buttonContainer}>
                  {index >= 0 ? (
                     <View style={styles.buttonCounter} >
                        <Pressable style={styles.buttonCounterText} onPress={() => dispatch(decreaseQuantityCreator(item.product_id))}>
                           <Text style={styles.buttonCounterText}>-</Text>
                        </Pressable>
                        <Text style={styles.CounterText}>{stateMenu.carts[index].quantity}</Text>
                        <Pressable style={styles.buttonCounterText}>
                           <Text style={styles.buttonCounterText} onPress={() => dispatch(increaseQuantityCreator(item.product_id))}>+</Text>
                        </Pressable>
                     </View>
                  ) : (
                        <Pressable style={styles.buttonAdd} onPress={() => dispatch(addToCart(
                           item.product_id,
                           item.product_name,
                           item.price,
                           item.image))}>
                           <Text style={styles.buttonAddText}>Beli</Text>
                        </Pressable>
                     )}
                  {/* <Pressable style={styles.buttonAdd} onPress={() => dispatch(addToCart(
                              item.product_id,
                              item.product_name,
                              item.price,
                              item.image))}>
                  <Text style={styles.buttonAddText}>Beli</Text>
               </Pressable>
               <View style={styles.buttonCounter} >
                     <Pressable style={styles.buttonCounterText} onPress={() => alert('DECREASE')}>
                        <Text style={styles.buttonCounterText}>-</Text>
                     </Pressable>
                     <Text style={styles.CounterText}>10</Text>
                     <Pressable style={styles.buttonCounterText}>
                        <Text style={styles.buttonCounterText} onPress={() => alert('INCREASE')}>+</Text>
                     </Pressable>
                  </View> */}
               </View>
            </View>
         </TouchableOpacity>
      </>
   );
};

const Menu = () => {
   const stateMenu = useSelector(state => state.menu);
   const menu = stateMenu.menus;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchMenus());
   }, [dispatch]);

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
   price: {
      fontSize: 14,
      fontWeight: 'bold',
   },
   menuImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   buttonAdd: {
      borderRadius: 5,
      backgroundColor: '#27ae60',
      width: 90,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonAddText: {
      color: 'white',
      fontWeight: 'bold',
   },
   buttonCounter: {
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor: '#fff',
      // shadow android
      elevation: 3,
      //shadow ios
      shadowColor: 'black',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 1,
      //
      width: 90,
      height: 30,
      justifyContent: 'space-around',
      alignItems: 'center',
   },
   CounterText: {
      color: 'black',
      fontWeight: 'bold',
   },
   buttonCounterText: {
      width: 30,
      textAlign: 'center',
      fontSize: 20,
      color: '#27ae60',
      fontWeight: 'bold',
   },
});

export default Menu;
