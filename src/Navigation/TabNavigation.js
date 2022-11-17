import {View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home'
import Profile from '../Screens/Profile/Profile';
import NewPost from '../Screens/NewPost/NewPost';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

export default function TabNavigation (){
    return(
            <Tab.Navigator
                screenOptions={{tabBarShowLabel: false}}
            >
                <Tab.Screen 
                    name='Home' 
                    component={Home}
                    options= {{ 
                        tabBarIcon: () => <FontAwesome name="home" size={35} color="black" />,
                        title: 'HOME', 
                        headerStyle: {
                            backgroundColor: 'brown',
            
                        },
                        headerTintColor: '#fff',
                        
                    }} 

                    
                />
                <Tab.Screen 
                    name = 'Profile' 
                    component={Profile}
                    options= {{ tabBarIcon: () => <MaterialCommunityIcons name="face-woman-profile" size={35} color="black" />, 
                    title: '', 
                    headerStyle: {
                        backgroundColor: 'brown',
                      }}}  
                />
                <Tab.Screen 
                    name = 'NewPost' 
                    component={NewPost}
                    options= {{ tabBarIcon: () =>  <MaterialIcons name="post-add" size={35} color="black" />, 
                    title: 'Make Your New Post', 
                    headerStyle: {
                        backgroundColor: 'brown',
                      },
                    headerTintColor: '#fff',
                    }}
                />
            </Tab.Navigator>
    )
}