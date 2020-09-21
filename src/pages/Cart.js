import React from 'react';
import Axios from 'axios';
import { View, Text, TextInput, StyleSheet, Dimensions, Image, Pressable, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantityCreator, decreaseQuantityCreator, clearCartCreator } from '../redux/actions/menu';

const Item = ({ item, style }) => {
   const dispatch = useDispatch();
   return (
      <>
         <SafeAreaView style={[styles.item, style]}>
            <Image style={styles.menuImage} source={{ uri: item.img }} />
            <View style={styles.titleWrapper}>
               <Text style={styles.title}>{item.name}</Text>
               <Text style={styles.price}>{`Rp ${item.price.toLocaleString()}`}</Text>
               <View style={styles.buttonContainer}>
                  <View style={styles.buttonCounter} >
                     <Pressable style={styles.buttonCounterText} onPress={() => dispatch(decreaseQuantityCreator(item.id))}>
                        <Text style={styles.buttonCounterText}>-</Text>
                     </Pressable>
                     <Text style={styles.CounterText}>{item.quantity}</Text>
                     <Pressable style={styles.buttonCounterText}>
                        <Text style={styles.buttonCounterText} onPress={() => dispatch(increaseQuantityCreator(item.id))}>+</Text>
                     </Pressable>
                  </View>
               </View>
            </View>
         </SafeAreaView>
      </>
   );
};

const Cart = ({ navigation }) => {
   const stateMenu = useSelector(state => state.menu);
   const stateAuth = useSelector(state => state.auth.user);

   const dispatch = useDispatch();

   let invoice = new Date().getTime();

   let totalPrice = stateMenu.carts.reduce((total, item) => {
      return total + (item.price * item.quantity);
   }, 0);

   let delivFee = 10000;

   let totalAll = stateMenu.carts.reduce((total, item) => {
      return total + (item.price * item.quantity * 0.1) + (item.price * item.quantity) + delivFee;
   }, 0);

   const handleInsertOrder = () => {

      const transactionItem = stateMenu.carts.map((item) => {
         return {
            product_id: item.id,
            quantity: item.quantity,
         };
      });

      // const localhost = 'http://192.168.1.137:8000';
      const localhost = 'http://192.168.43.42:8000';

      const URLString = `${localhost}/transaction`;

      const data = {
         invoice: invoice,
         // cashier: stateMenu.auth.user.username,
         cashier: stateAuth.name,
         total: totalAll,
         transaction: transactionItem,
      };
      // console.log(data);

      Axios.post(URLString, data)
         .then((res) => {
            // console.log(res);
            dispatch(clearCartCreator());
            navigation.navigate('Home');
         })
         .catch(err => console.log(err));
   };


   const renderItem = ({ item }) => {
      return (
         <Item
            item={item}
         />
      );
   };

   return (
      <SafeAreaView style={styles.container}>
         <FlatList
            data={stateMenu.carts}
            ListHeaderComponent={
               <>
                  <View style={styles.addressContainer}>
                     <Text style={styles.labelAddres}>Alamat Pengiriman</Text>
                     <TextInput
                        placeholder="Masukan alamat pengiriman"
                        style={styles.addressInput}
                     />
                  </View>
                  <View style={styles.cartContainer}>
                     <Text style={styles.labelContainer}>Pesanan</Text>
                  </View>
               </>
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={
               <View style={styles.paymentContainer}>
                  <Text style={styles.labelContainer}>Detail Pembayaran</Text>
                  <View style={styles.priceContainer}>
                     <View>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.priceLabel}>Fee 10%</Text>
                        <Text style={styles.priceLabel}>Delivery Fee</Text>
                     </View>
                     <View>
                        <Text style={styles.priceText}>{totalPrice.toLocaleString()}</Text>
                        <Text style={styles.priceText}>{(totalPrice * 0.1).toLocaleString()}</Text>
                        <Text style={styles.priceText}>{delivFee.toLocaleString()}</Text>
                     </View>
                  </View>
                  <View style={styles.priceContainer}>
                     <Text style={styles.priceTotal}>Total Pembayaran</Text>
                     <Text style={styles.priceTotal}>{totalAll.toLocaleString()}</Text>
                  </View>
               </View>
            }
         />
         <View style={styles.bottomOrderContainer}>
            <View style={{ flexDirection: 'row' }}>
               <Text style={styles.bottomTotalText}>{totalAll.toLocaleString()}</Text>
               <Text style={styles.cashText}>Cash</Text>
            </View>
            <Pressable onPress={() => handleInsertOrder()} >
               <View style={styles.orderButton}>
                  <View>
                     <Text style={styles.orderButtonText}>Pesan</Text>
                  </View>
               </View>
            </Pressable>
         </View>
      </SafeAreaView>
   );
};

const { height } = Dimensions.get('screen');
const styles = StyleSheet.create({
   container: {
      // height: height,
      flex: 1,
   },
   // alamat
   addressContainer: {
      backgroundColor: '#fff',
      // borderBottomWidth: 1,
      elevation: 3,
      marginBottom: 20,
      // height: 80,
      flex: 1,
   },
   addressInput: {
      // borderWidth: 1,
      backgroundColor: '#ecf0f1',
      borderRadius: 5,
      marginBottom: 10,
      width: '90%',
      height: '50%',
      alignSelf: 'center',
      paddingHorizontal: 20,
   },
   labelAddres: {
      color: '#34495e',
      marginLeft: 20,
      marginVertical: 10,
   },
   // pesanan
   cartContainer: {
      backgroundColor: '#fff',
      // flex: 1,
   },
   labelContainer: {
      marginVertical: 10,
      marginLeft: 20,
      fontSize: 18,
      fontWeight: 'bold',
   },
   //item
   item: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      // marginVertical: 8,
      // marginHorizontal: 16,
      // borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
   },
   menuImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
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
   price: {
      fontSize: 14,
      fontWeight: 'bold',
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
   // payment
   paymentContainer: {
      backgroundColor: '#fff',
      marginTop: 20,
      paddingBottom: 10,
   },
   priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
   },
   priceLabel: {
      marginVertical: 5,
   },
   priceText: {
      marginVertical: 5,
      alignSelf: 'flex-end',
   },
   priceTotal: {
      marginVertical: 5,
      fontWeight: 'bold',
   },
   // order bottom
   bottomOrderContainer: {
      backgroundColor: 'white',
      // borderTopWidth: 0.3,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,

      elevation: 15,
   },
   orderButton: {
      backgroundColor: '#27ae60',
      height: 50,
      marginBottom: 20,
      marginHorizontal: 16,
      borderRadius: 5,
      justifyContent: 'center',
      elevation: 5,
      alignItems: 'center',
   },
   orderButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
   },
   bottomTotalText: {
      fontSize: 16,
      marginVertical: 7,
      marginHorizontal: 20,
      fontWeight: 'bold',
   },
   cashText: {
      fontSize: 14,
      padding: 3,
      borderRadius: 10,
      backgroundColor: '#27ae60',
      color: '#fff',
      alignSelf: 'center',
   },
});

export default Cart;
