import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Image,
   Dimensions,
   ScrollView,
} from 'react-native';
import gambar from '../assets/img/gambar.jpg';
import { FlatGrid } from 'react-native-super-grid';

// const CardMenu = () => {
//    return (
//       <View
//          style={{
//             padding: 12,
//             backgroundColor: 'blue',
//             flex: 1,
//             borderRadius: 8,
//          }}>
//          <Image
//             source={gambar}
//             style={{ width: 188, height: 107, borderRadius: 8 }}
//          />
//          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 16 }}>
//             Tom Newspaper
//       </Text>
//          <Text>Tom & Jerry</Text>
//          <Text>Usa</Text>
//       </View>
//    );
// };

const category = [
   { name: "Food", image: { uri: 'https://www.masakapahariini.com/wp-content/uploads/2019/11/shutterstock_1469046305.jpg' } },
   { name: "Beverage", image: { uri: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/04/1.jpg' } },
   { name: "All Menus", image: gambar },
];

const Home = () => {
   return (
      <View style={style.container}>
         <View style={style.header}>
            <TextInput
               style={style.searchHeader}
               placeholder={'Mau makan apa hari ini?'}
            />
         </View>
         <View style={style.content}>
            <View style={{ backgroundColor: '#e74c3c', flex: 2 }} />
            <View style={{ flex: 5 }} >
               <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Category</Text>
               <FlatGrid
                  itemDimension={130}
                  data={category}
                  renderItem={({ item }) => (
                     <View style={{ alignItems: 'center', borderRadius: 8 }}>
                        <Image source={item.image} style={{ height: 130, width: 130, borderRadius: 8 }} />
                        <Text style={{ fontSize: 14 }}>{item.name}</Text>
                     </View>
                  )}
               />
            </View>
            {/* <View style={{ backgroundColor: '#2ecc71', flex: 2 }} /> */}
            <View style={{ backgroundColor: '#2980b9', flex: 1 }} />
         </View>
      </View>
   );
};

const { height } = Dimensions.get("screen")
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
});

export default Home;
