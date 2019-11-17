import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import {
    LoginContainer, LoginInput,
    LoginTouchableOpacity, LoginTouchableOpacityText, LoginScrollView
} from './styles';
import api from './../../services/api'

class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Registo',
    };

    emailTextInput;
    passwordTextInput;

    state = {
        name: '',
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

    signUp = async () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        try {
            this.setState({ error: null })
            const loginRes = await api.post('/auth/register', user);
            await AsyncStorage.setItem('@MyTDays:token', loginRes.data.token);
            this.props.navigation.navigate('App');

        } catch (e) {
            this.setState({ error: e.data ? e.data.error : e.problem })
        }
    }


    render() {
        return (
            <LoginContainer>
                <LoginInput
                    placeholder="Nome"
                    returnKeyType={'next'}
                    onSubmitEditing={() => { this.emailTextInput.focus(); }}
                    blurOnSubmit={false}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />
                <LoginInput
                    placeholder="Email"
                    returnKeyType={'next'}
                    ref={(input) => { this.emailTextInput = input; }}
                    blurOnSubmit={false}
                    onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <LoginInput
                    placeholder="Password"
                    secureTextEntry={true}
                    ref={(input) => { this.passwordTextInput = input; }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <LoginTouchableOpacity onPress={this.signUp} >
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

export default SignupScreen;
