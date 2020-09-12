import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Image, View, TouchableHighlight, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus, addToCart } from '../redux/actions/menu';

const Item = ({ item, onPress, style }) => {
   const dispatch = useDispatch();
   return (
      <>
         <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Image style={styles.menuImage} source={{ uri: item.image }} />
            <View style={styles.titleWrapper}>
               <Text style={styles.title}>{item.product_name}</Text>
               <Text style={styles.desc}>Deskripsi produk. Ini hanyalah sebagai contoh deskripsi produk</Text>
               <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  {/* <Pressable style={styles.buttonAdd} onPress={() => dispatch(addToCart(
                     item.product_id,
                     item.product_name,
                     item.price,
                     item.image))}>
                     <Text style={styles.buttonAddText}>Beli</Text>
                  </Pressable> */}
                  <View style={styles.buttonCounter} >
                     <Pressable style={styles.buttonCounterText} onPress={() => alert("DECREASE")}>
                        <Text style={styles.buttonCounterText}>-</Text>
                     </Pressable>
                     <Text style={styles.CounterText}>10</Text>
                     <Pressable style={styles.buttonCounterText}>
                        <Text style={styles.buttonCounterText} onPress={() => alert("INCREASE")}>+</Text>
                     </Pressable>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      </>
   );
};

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
      borderColor: '#27ae60',
      borderWidth: 0.3,
      width: 90,
      height: 30,
      justifyContent: 'space-around',
      alignItems: 'center',
   },
   CounterText: {
      color: '#27ae60',
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
