import {View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home'
import Profile from '../Screens/Profile/Profile';
import NewPost from '../Screens/NewPost/NewPost';


const Tab = createBottomTabNavigator()

export default function TabNavigation (){
    return(
            <Tab.Navigator>
                <Tab.Screen 
                    name = 'Home' 
                    component={Home}
                    options={ { headerShown: false } } 
                />
                <Tab.Screen 
                    name = 'Profile' 
                    component={Profile}
                    options={ { headerShown: false } } 
                />
                <Tab.Screen 
                    name = 'NewPost' 
                    component={NewPost}
                    options={ { headerShown: false } } 
                />
            </Tab.Navigator>
    )
}