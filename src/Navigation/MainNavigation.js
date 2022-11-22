import {View, Text} from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from './TabNavigation';
import LoginScreen from '../Screens/Login/Login'
import Register from "../Screens/Register/Register";
import Comentario from '../Screens/Comentario/Comentario'; 
import ProfileUser from '../Screens/ProfileUser/ProfileUser';
import Buscador from '../Screens/Buscador/Buscador';
import Profile from '../Screens/Profile/Profile';


const Stack = createNativeStackNavigator() //guardar en una variable la ejecucion de cnsn

function MainNavigation (){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={ { headerShown: false } } 
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register} 
                    options={ { headerShown: false } } 
                />
                <Stack.Screen
                    name='TabNavigation'
                    component={TabNavigation}
                    options={ { headerShown: false } } 
                />
                <Stack.Screen name="MainNavigation" component={ MainNavigation } options= {{ headerShown : false}}/>
                <Stack.Screen name="Comentario" component={Comentario}/>
                <Stack.Screen name="ProfileUser" component={ProfileUser} />
                <Stack.Screen name="Buscador" component={Buscador} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation;