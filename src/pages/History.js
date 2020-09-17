import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoryCreator, showHistoryCreator } from '../redux/actions/history';
import moment from 'moment';

import spoonIcon from '../assets/icon/spoon.png';


const Item = ({ item, style }) => {

   // const stateHistory = useSelector(state => state.history.showHistory);

   // // console.log(menu);

   // const dispatch = useDispatch();

   // useEffect(() => {
   //    dispatch(showHistoryCreator(item.invoice));
   // }, [dispatch, item.invoice]);

   return (
      <>
         <SafeAreaView style={[styles.item, style]}>
            <View style={styles.iconContainer}>
               <Image source={spoonIcon} style={styles.icon} />
            </View>
            <View style={styles.detailContainer}>
               <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 14 }}>{moment(item.date).format('DD MMM YYYY, HH:mm')} &middot; </Text>
                  <Text style={{ color: '#27ae60', fontSize: 10, fontWeight: 'bold', alignSelf: 'center' }}>SELESAI</Text>
               </View>
               {/* <Text>{item.invoice}</Text> */}
               <Text style={{ fontWeight: 'bold' }}>{`Total belanja : Rp ${(item.total).toLocaleString()}`}</Text>
            </View>
         </SafeAreaView>
      </>
   );
};

const History = () => {

   const renderItem = ({ item }) => {
      return (
         <Item item={item} />
      );
   };

   const currentUser = useSelector(state => state.auth.user.name);
   const stateHistory = useSelector(state => state.history.history);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchHistoryCreator(currentUser));
   }, [currentUser, dispatch]);

   return (
      <SafeAreaView>
         <FlatList
            data={stateHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item.invoice}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   item: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 20,
      // marginVertical: 8,
      // marginHorizontal: 16,
      // borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      elevation: 1,
      alignItems: 'center',
      marginTop: 10,
   },
   iconContainer: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 25,
      height: 45,
      width: 45,
      justifyContent: 'center',
      alignItems: 'center',
   },
   icon: {
      width: 25,
      height: 25,
   },
   detailContainer: {
      marginLeft: 15,
   },
});

export default History;
