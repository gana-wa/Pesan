import React, { useState, useEffect } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LoggedOut } from '../redux/actions/auth';
import { clearCartCreator } from '../redux/actions/menu';
import { clearHistoryCreator } from '../redux/actions/history';

const Profile = ({ navigation }) => {
    const [logOut, setLogOut] = useState(false);

    const stateUser = useSelector(
        (state) => state.auth.user
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (logOut) {
            dispatch(LoggedOut());
            dispatch(clearCartCreator());
            dispatch(clearHistoryCreator());
            setLogOut(false);
            navigation.navigate('Login');
        }
    }, [dispatch, logOut, navigation]);

    const handleLogOut = () => {
        setLogOut(true);
    };
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
                    <ListItem onPress={() => navigation.navigate('ProfileEdit')}>
                        <Text>Ubah Profil</Text>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('History')}>
                        <Text>Riwayat pesanan</Text>
                    </ListItem>
                    {/* <ListItem>
                        <Text>Bantuan</Text>
                    </ListItem> */}
                </List>
            </Content>
            <Pressable onPress={handleLogOut}>
                <View style={styles.buttonLogout}>
                    <Text style={styles.buttonLogoutText}>Keluar</Text>
                </View>
            </Pressable>
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
