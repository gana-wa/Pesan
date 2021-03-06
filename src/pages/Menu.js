import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus, addToCart, increaseQuantityCreator, decreaseQuantityCreator, menuByCategory, searchMenu } from '../redux/actions/menu';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({ item, style }) => {
   const stateMenu = useSelector(state => state.menu);
   const dispatch = useDispatch();
   const index = stateMenu.carts.findIndex(inCart => {
      return inCart.id === item.product_id;
   });
   return (
      <>
         <View style={[styles.item, style]}>
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
               </View>
            </View>
         </View>
      </>
   );
};

const Menu = ({ navigation, route }) => {

   const { categoryName, isSearch, searchKey } = route.params;

   const stateMenu = useSelector(state => state.menu);
   const menu = stateMenu.menus;
   const dispatch = useDispatch();
   useEffect(() => {
      if (isSearch) {
         dispatch(searchMenu(searchKey, 'product_name'));
      } else {
         if (categoryName === 'All Menu') {
            dispatch(fetchMenus());
         } else {
            dispatch(menuByCategory(categoryName));
         }
      }
   }, [categoryName, dispatch, isSearch, searchKey]);

   let totalItem = stateMenu.carts.reduce((total, item) => {
      return total + item.quantity;
   }, 0);

   let totalPrice = stateMenu.carts.reduce((total, item) => {
      return total + (item.price * item.quantity);
   }, 0);

   const [selectedId, setSelectedId] = useState(null);

   const renderItem = ({ item }) => {
      return (
         <Item
            item={item}
            onPress={() => setSelectedId(item.product_id)}
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
         {stateMenu.carts.length ? (
            <Pressable onPress={() => navigation.navigate('Cart')}>
               <View style={styles.cartButton}>
                  <View>
                     <Text style={styles.cartButtonText}>{totalItem > 1 ? (`${totalItem} items`) : (`${totalItem} item`)}</Text>
                     <Text style={styles.cartButtonText}>{`Total: ${totalPrice.toLocaleString()}`}</Text>
                  </View>
                  <View>
                     <Icon name="basket" color="#fff" size={25} />
                  </View>
               </View>
            </Pressable>
         ) : (null)}
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // marginTop: StatusBar.currentHeight || 0,
   },
   item: {
      backgroundColor: '#fff',
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
   cartButton: {
      backgroundColor: '#27ae60',
      height: 50,
      marginBottom: 20,
      marginHorizontal: 16,
      borderRadius: 5,
      paddingHorizontal: 20,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   cartButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
   },
});

export default Menu;
