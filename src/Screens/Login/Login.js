import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

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

        <Text>Login</Text>
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
            placeholder='Ingresa tu Password'
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <View>
            <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                <Text>Log In</Text>
            </TouchableOpacity>
        </View>

        <View>
            <Text>
            Todavia no tenes una cuenta registrada
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}> 
            <Text>Registrate</Text>
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
    }
})

export default LoginScreen