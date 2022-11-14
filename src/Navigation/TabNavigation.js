import {View, Text } from 'react-native'
import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home'
import Perfil from '../Screens/Profile/Profile';
import Posts from '../Screens/Posts/Posts'


const Tab = createBottomTabNavigator()

export default function TabNavigation (){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name = 'Home' 
                    component={Home}
                />
                <Tab.Screen 
                    name = 'Profile' 
                    component={Profile}
                />
                <Tab.Screen 
                    name = 'Posts' 
                    component={Posts}
                />
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}