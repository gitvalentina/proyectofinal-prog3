import {View, Text} from 'react-native'
import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from './TabNavigation';
import LoginScreen from '../Screens/Login/Login'
import Register from "../Screens/Register/Register";
import Home from '../Screens/Home/Home'

const Stack = createNativeStackNavigator() //guardar en una variable la ejecucion de cnsn

function MainNavigation (){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register} 
                />
                <Stack.Screen
                    name='TabNavigation'
                    component={TabNavigation}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation;