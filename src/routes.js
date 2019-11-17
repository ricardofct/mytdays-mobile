import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './pages/home';
import LoginScreen from './pages/login';
import AuthLoadingScreen from './pages/auth-loading';
import SignupScreen from './pages/signup';

const AuthNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen
    },
    {
        initialRouteName: 'Login'
    }
)

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen
    }
);


export default Routes = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppNavigator,
            Auth: AuthNavigator
        },
        {
            initialRouteName: 'AuthLoading',
        }
    ));