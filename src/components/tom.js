import React from 'react';
import { View, Image, Text } from 'react-native';
import gambar from '../assets/img/gambar.jpg';

const TomComponent = () => {
    return (
        <View style={{ padding: 12, backgroundColor: "#f2f2f2", width: 212, borderRadius: 8 }}>
            <Image source={gambar} style={{ width: 188, height: 107, borderRadius: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 16 }}>Tom Newspaper</Text>
            <Text>Tom & Jerry</Text>
            <Text>Usa</Text>
        </View>
    )
}

export default TomComponent;
