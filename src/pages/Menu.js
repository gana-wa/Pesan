import React from 'react';
import { View, Text } from 'react-native';

const Menu = ({ route }) => {
    return (
        <View>
            <Text>{route.name} Page</Text>
        </View>
    )
}

export default Menu;
