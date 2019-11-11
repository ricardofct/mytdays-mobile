import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'LandingPage',
    };

    state = {
        username: '',
        password: ''
    };


    render() {
        return (
            <View>
                <Text>
                    Landing page
                </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}>
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen;
