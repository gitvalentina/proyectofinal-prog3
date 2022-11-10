import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config';

class Register extends Component {
    constructor(){
        super()
        this.state ={
            username:'',
            email:'',
            password:''
        }
    }
    registrarUsuario(username, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=> {
            return(
                db.collection('users').add({
                    email:email,
                    username:username,
                    createdAt:Date.now()
                })
            )
        })
        .then(resp => this.props.navigation.navigate('Home'))
        .catch(err => console.log(err))      
    }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <Text>Formulario del registro</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Escribi el nombre de usuario'
                    keyboardType='default'
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escribi el email'
                    keyboardType='email-address'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escribi la contraseña'
                    keyboardType='default'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Ya tienes un cuenta?</Text>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                        <Text>Logueate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
    }
    
    const styles = StyleSheet.create({
        container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:21
        },
        input:{
            borderWidth:1
        },
        containerRedirect:{
            marginTop: 32
        }
    })
    
    
    export default Register