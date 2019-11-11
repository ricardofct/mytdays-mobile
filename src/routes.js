import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './pages/home';
import LoginScreen from './pages/login';
import AuthLoadingScreen from './pages/auth-loading';

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>


                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                    <Text>
                        Home
                        </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const AuthNavigator = createStackNavigator(
    {
        Login: LoginScreen
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