import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './pages/home';
import LoginScreen from './pages/login';

// class HomeScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Home Screen</Text>

//                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')} >
//                     <Text>
//                         Details
//                         </Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

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

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        Login: LoginScreen
    },
    {
        initialRouteName: 'Login',
    }
);


export default Routes = createAppContainer(AppNavigator);