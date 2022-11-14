import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../../firebase/config';

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    componentDidMount(){ //recibe user


    auth.onAuthStateChanged(user => { 
        if(user !== null){ // user  distinto de null me redirige
        this.props.navigation.navigate('TabNavigation')
        }
    })
//che ,e falta  sign out


    }


    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log(err))
    }
    render() {
    return (
    <View style={styles.container}>
    <View>

        <Text style={styles.texto3} >Inicia Sesion</Text>
        <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Ingresa tu email'
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='Ingresa tu contraseña'
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />

<<<<<<< HEAD
        {this.props.error==""?<Text></Text>: <Text style={styles.textoerror}>{this.props.error}</Text>}
        {this.state.email.length==0|| this.state.password.length==0? 
            <TouchableOpacity style={styles.touchableL}>
                <Text style={styles.texto}>Ingresa Email y Password</Text>
            </TouchableOpacity>:
            <TouchableOpacity style={styles.touchable} onPress={()=> this.loguear(this.state.email, this.state.password)}>
                <Text>Log In</Text>
=======
        <View>
            <Text>
            Todavia no tenes una cuenta registrada?
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}> 
            <Text>Registrate</Text>
>>>>>>> 88f8b848925ea79a312aa73c0f6d7d93eb135f07
            </TouchableOpacity>
        }
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}> 
            <Text style={styles.texto2}> Todavia no tienes cuenta?  Registrate</Text>
        </TouchableOpacity>
    </View>
    </View>)}
}

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
<<<<<<< HEAD
    marginTop:20,
    paddingHorizontal: 10,
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
    touchableL:{
        textAlign:"center",
        padding: 5,
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgba(84, 78, 73, 0.9)",
        justifyContent: "center"
    },
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: " rgba(84, 204, 73, 0.9)",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgba(84, 204, 73, 0.9)"
    },

    textoerror: {
        color: "red"
    },
    texto:{
        color:"#FFF"
    },
    texto2:{
        color:"white",
        textAlign:"center"
    },
    texto3:{
        color:'white'

export default LoginScreen;