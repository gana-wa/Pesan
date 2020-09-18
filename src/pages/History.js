import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoryCreator, showHistoryCreator } from '../redux/actions/history';
import moment from 'moment';
import Modal from 'react-native-modal';

import ModalDetail from '../components/ModalDetail';

import spoonIcon from '../assets/icon/spoon.png';

// const ModalDetail = ({ item, isModalVisible, setModalVisible }) => {
//    const dispatch = useDispatch();

//    const detailHistory = useSelector(state => state.history.showHistory);

//    useEffect(() => {
//       dispatch(showHistoryCreator(item.invoice));
//    }, [dispatch, item.invoice]);

//    return (
//       <>
//          <Modal
//             isVisible={isModalVisible}
//             backdropOpacity={1}
//             swipeDirection="down"
//             onSwipeComplete={() => setModalVisible(false)}
//             style={styles.modal}
//          >
//             <View style={styles.modalContainer}>
//                <View style={styles.borderTop} />
//                <View style={styles.modalHeader}>
//                   <View style={styles.iconContainer}>
//                      <Image source={spoonIcon} style={styles.icon} />
//                   </View>
//                   <View>
//                      <Text style={styles.textDate}>{moment(item.date).format('DD MMM YYYY, hh:mm A')}</Text>
//                      <Text style={styles.textInvoice}>{item.invoice}</Text>
//                   </View>
//                </View>
//                <View>
//                   <Text>Pesanan</Text>
//                   <Text>{detailHistory.map(menu => menu.product_name)}</Text>
//                </View>
//             </View>
//          </Modal>
//       </>
//    );
// };

const Item = ({ item, style }) => {
   const [isModalVisible, setModalVisible] = useState(false);

   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };

   const stateHistory = useSelector(state => state.history.showHistory);

   // console.log(menu);

   // const dispatch = useDispatch();

   // useEffect(() => {
   //    dispatch(showHistoryCreator(item.invoice));
   // }, [dispatch, item.invoice]);

   return (
      <>
         <Pressable onPress={toggleModal}>
            <SafeAreaView style={[styles.item, style]}>
               <View style={styles.iconContainer}>
                  <Image source={spoonIcon} style={styles.icon} />
               </View>
               <View style={styles.detailContainer}>
                  <View style={{ flexDirection: 'row' }}>
                     <Text style={{ fontSize: 14 }}>{moment(item.date).format('DD MMM YY, HH:mm')} &middot; </Text>
                     <Text style={{ color: '#27ae60', fontSize: 10, fontWeight: 'bold', alignSelf: 'center' }}>SELESAI</Text>
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>{`Total belanja : Rp ${(item.total).toLocaleString()}`}</Text>
               </View>
            </SafeAreaView>
         </Pressable>
         <ModalDetail isModalVisible={isModalVisible} item={item} setModalVisible={setModalVisible} />
      </>
   );
};

const History = () => {

   const renderItem = ({ item }) => {
      return (
         <>
            <Item item={item} />
         </>
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
      flex: 1,
      flexDirection: 'row',
      // elevation: 1,
      alignItems: 'center',
      // marginTop: 10,
      borderBottomWidth: 0.7,
      borderBottomColor: '#bdc3c7',
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
   // modal
   modal: {
      margin: 0,
   },
   modalContainer: {
      flex: 1,
      backgroundColor: '#fff',
   },
   modalHeader: {
      flexDirection: 'row',
      // backgroundColor: 'grey',
      paddingHorizontal: 10,
      paddingVertical: 20,
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#bdc3c7',
   },
   borderTop: {
      backgroundColor: '#bdc3c7',
      width: '15%',
      height: 5,
      alignSelf: 'center',
      marginVertical: 10,
      borderRadius: 5,
   },
   textDate: {
      fontSize: 14,
      textAlign: 'right',
   },
   textInvoice: {
      textAlign: 'right',
   },
});

export default History;
