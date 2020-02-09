import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import {
    LoginContainer, LoginInput,
    LoginTouchableOpacity, LoginTouchableOpacityText
} from './styles';
import api from './../../services/api'

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    state = {
        email: 'trindade@t.pt',
        password: '123',
        // email: 'r@r.pt',
        // password: '123',
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

    signIn = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        try {
            this.setState({ error: null })
            const loginRes = await api.post('/auth/login', user);
            await AsyncStorage.setItem('@MyTDays:token', loginRes.data.token);
            this.props.navigation.navigate('App');
        } catch (e) {
            this.setState({ error: e.data ? e.data.error : e.problem })
        }
    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <LoginContainer>
                <LoginInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />

                <LoginInput
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <LoginTouchableOpacity onPress={this.signIn} >
                    <LoginTouchableOpacityText >
                        Entrar
                        </LoginTouchableOpacityText>
                </LoginTouchableOpacity>

                <LoginTouchableOpacity
                    onPress={() => { navigate('Signup') }}
                >
                    <LoginTouchableOpacityText >
                        Registar
                        </LoginTouchableOpacityText>
                </LoginTouchableOpacity>

                <Text>
                    {this.state.error}
                </Text>
            </LoginContainer >

        );
    }
}

export default LoginScreen;
