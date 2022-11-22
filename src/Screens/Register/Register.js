import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config';


class Register extends Component {
    constructor(){
        super()
        this.state ={
            username:'',
            email:'',
            password:'',
            biografia:'',
            //imagenPerfil:''
        }
    }
    registrarUsuario(username, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=> {
            return(
                db.collection('users').add({
                    email:email,
                    username:username,
                    biografia:biografia,
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
                <Text style={styles.texto3}>REGISTER</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder='Escribi algo sobre vos'
                    keyboardType='default'
                    onChangeText={text => this.setState({biografia: text})}
                    value={this.state.biografia}
                />
                <View>
                    <TouchableOpacity style={styles.touchable} onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                        <Text style={styles.texto2}> Ya tienes un cuenta? Logueate</Text>
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
        paddingHorizontal:10,
        backgroundColor:"black",
        height:"100%",
        },
        input:{
            height: 50,
            borderWidth:3,
            backgroundColor:"white",
            borderStyle:"solid",
            borderColor: "rgba(176, 145, 0, 0.9)",
            borderRadius:6,
            paddingHorizontal:10,
            paddingVertical:15,
            marginVertical:10,
            justifyContent: 'flex-end'
        },
        touchable:{
            textAlign:"center",
            padding: 5,
            backgroundColor: "rgba(176, 145, 0, 0.9)",
            marginBottom: 10,
            borderRadius:4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderStyle:"solid",
            borderWidth:1,
            borderColor:"rgba(176, 145, 0, 0.9)"
        },
        texto2:{
            color:"white",
            textAlign:"center"
        },
        texto3:{
            color:'white',
            textAlign: 'center',
            fontSize: 40
        }
    })
    
    
    export default Register