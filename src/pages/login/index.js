import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

import { LoginContainer } from './styles';

import api from './../../services/api'

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    state = {
        email: '',
        password: '',
        error: null
    };

    componentDidMount() {
        this.removeToken();
    }

    removeToken = async () => {
        try {
            const token = await AsyncStorage.getItem('@MyTDays:token');
            console.log('token', token)
            // if (token) {
            await AsyncStorage.removeItem('@MyTDays:token');
            // }


            const token2 = await AsyncStorage.getItem('@MyTDays:token');
            console.log('token', token2)
        } catch (e) {
            console.log(e);
        }
    }

    singUp = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        try {
            this.setState({ error: null })
            const loginRes = await api.post('/auth/login', user);
            await AsyncStorage.setItem('@MyTDays:token', loginRes.data.token);
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0);
            // this.props.navigation.navigate(
            //     {
            //         routeName: 'Home',
            //         params: {},

            //         // navigate can have a nested navigate action that will be run inside the child router
            //         action: NavigationActions.pop({ routeName: 'SubProfileRoute' }),
            //       }
            // );




        } catch (e) {
            this.setState({ error: e.data ? e.data.error : e.problem })
        }
    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <LoginContainer>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to translate!"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to translate!"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <TouchableOpacity onPress={this.singUp} >
                    <Text>
                        Submit
                        </Text>
                </TouchableOpacity>

                <Text>
                    {this.state.error}
                </Text>
            </LoginContainer>

        );
    }
}

export default LoginScreen;
