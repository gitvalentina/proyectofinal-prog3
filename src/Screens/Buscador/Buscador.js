import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';

//base del otro proyecto 
class Buscador extends Component{ //capturar valores
    constructor(props){ // Representan información que es enviada al momento en el que un componente es utilizado. 
        super(props) //componente hijo de Home
        this.state={
            valorInput:'',
        }
    }


    prevenirRefresh(event){
        event.preventDefault(); // detiene el envío del formulario 
    }

    controlarCambiosDelInput(event){ //obtiene el valor ingresado en el input y actualiza el estado interno del componente.
        this.setState({ // Es un método asincrónico: 
            
            valorInput /*vacio en el constructor */: event.target.value  // target identifica el campo objetivo y la prop value obtiene el valor ingresado

        }, ()=> this.props.metodoQueBusca(this.state.valorInput)) // recibe un callback como segundo parámetro que se ejecuta cuando el estado se actualizó. ARROW FUNCTION
    }
    reset(){
        this.props.metodoQueResetea();
        this.setState({valorInput: ''})
    }

    render(){
        return(
            <form onSubmit={(event)=> this.prevenirRefresh(event)}>
                {<input type= "text" onChange={(event)=> this.controlarCambiosDelInput(event)}  placeholder="Buscar" value={this.state.valorInput} /> } {/*para que se sincronize con la info que estamos actualizando*/}
                <button onClick={()=>this.reset()}>reset</button>
            </form>
            )
        }
}
//el evento onChange: para obtener la info que el usuario ingresa en el campo. el estado del componente se actualizará cada vez que el usuario ingrese un carácter.

export default Buscador;



