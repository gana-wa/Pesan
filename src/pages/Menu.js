import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus } from '../redux/actions/menu';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Image style={styles.menuImage} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.product_name}</Text>
    </TouchableOpacity>
);


const Menu = () => {
    const menu = useSelector(state => state.menu.menus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMenus());
    }, []);
    console.log(menu);

    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.product_id === selectedId ? '#6e3b6e' : '#f9c2ff';

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
                keyExtractor={(item) => item.product_id}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    menuImage: {
        width: 100,
        height: 100,
    },
});

export default Menu;
