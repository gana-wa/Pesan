import React from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const Profile = () => {
    const stateUser = useSelector(
        (state) => state.auth.user
    );
    return (
        <Container>
            <View style={styles.profileContainer}>
                <View style={styles.profileInitialIcon}>
                    <Text style={styles.profileInitialText}>{(stateUser.name).slice(0, 1).toUpperCase()}</Text>
                </View>
                <Text style={styles.nameText}>{stateUser.name}</Text>
                <Text style={styles.phoneText}>{stateUser.telp}</Text>
            </View>
            <Content>
                <List>
                    <ListItem>
                        <Text>Ubah Profil</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Riwayat pesanan</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Bantuan</Text>
                    </ListItem>
                </List>
            </Content>
            <View style={styles.buttonLogout}>
                <Text style={styles.buttonLogoutText}>Keluar</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileInitialIcon: {
        backgroundColor: '#27ae60',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitialText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    nameText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    phoneText: {
        color: '#7f8c8d',
    },
    buttonLogout: {
        borderColor: '#e74c3c',
        borderWidth: 1,
        borderRadius: 50,
        height: 50,
        marginBottom: 25,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogoutText: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },
});

export default Profile;
