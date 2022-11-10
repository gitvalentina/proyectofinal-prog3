import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Camera} from 'expo-camera';
import {storage} from '../../firebase/config';

class Camara extends Component {
    constructor(){
        super()
        this.state={
            showCamara: false,
            fotoUri:''
        }
    }

    componentDidMount(){

    }

    aceptarImage(){

    }

    rechazarImagen(){

    }
    
    render() {
        return (
            <View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Camara;
