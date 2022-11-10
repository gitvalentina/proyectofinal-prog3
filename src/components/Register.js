import React, {Component} from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {auth} from '../../firebase/config'


class Register extends Component {
    constructor(){
        super()
        this.state = {
            input1: '',
            input2: ''
        }
    }

    registrarUsuario(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(resp => console.log(resp))
        .catch(e => console.log(e))
    }

    




    render(){
        return(
            <View>
                <Text> Formulario </Text>
                <TextInput
                style={Styles.input}
                placeholder= 'Escribe tu email'
                keyboardType="emai-address"
                onChangeText={text => this.setState({input1: text})}
                value={this.state.input1}
                />
                <TextInput
                style={Styles.input}
                placeholder= 'Escribe tu password'
                keyboardType="default"
                onChangeText={text => this.setState({input2: text})}
                value={this.state.input2}
                secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.input1, this.state.input2)}>
                        <Text> Registrarme</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    input: {
        borderWidth: 2,
    }
})

export default Register