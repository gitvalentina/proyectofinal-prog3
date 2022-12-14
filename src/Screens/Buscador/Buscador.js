import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';


//base del otro proyecto 
class Buscador extends Component{ //capturar valores
    constructor(props){ // Representan información que es enviada al momento en el que un componente es utilizado. 
        super(props) //componente hijo de Home
        this.state={
            data: [],
            id:'', 
            resultado: [],
            user: [], 
            valorInput: '',
            buscarlo:'',
            mensaje: ''
        }
    }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(doc => {
          let resultado = [];
            doc.forEach(doc => {
                resultado.push({
                    id: doc.id, 
                    data: doc.data()
                })
                
            })
            this.setState(
                {data: resultado}
            )
         
        })
    } 

    buscar(text){
    
        let filtrado = this.state.data.filter(elm =>
            { 
                if(elm.data.username.toUpperCase().includes(text.toUpperCase())){
                    return elm
                }
        })
            this.setState({buscarlo: text})
                if(filtrado.length > 0){
                    this.setState({
                        user: filtrado,
                        users: text
                    })
                } 
                else{
                    this.setState({
                        mensaje: "No se ha encontrado ningun usuario con ese nombre"
                    })
                    
                }
    }

    render(){
        return( 
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Search Users by Username'
                    keyboardType="default"
                    onChangeText={text => this.setState( {valorInput:text} )}
                    value={this.state.valorInput}
                />

                <TouchableOpacity style={styles.touchableL} onPress={()=> this.buscar(this.state.valorInput)} >
                    <Text>Buscar</Text> 
                </TouchableOpacity>
                
                <FlatList
                    data={this.state.user}
                    keyExtractor={(item) => item.id}
                    renderItem= { ({item}) => <View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ProfileUser', { email: item.data.email })}>
                            <Text style={styles.user}>{item.data.username}</Text >
                        </TouchableOpacity> 
                    </View> }
                />
                <Text>{this.state.mensaje}</Text>
            </View>
        )
    
    }
}
//el evento onChange: para obtener la info que el usuario ingresa en el campo. el estado del componente se actualizará cada vez que el usuario ingrese un carácter.
const styles=StyleSheet.create({
    input:{
        height: 50,
        width:300,
        alignSelf:'center',
        borderWidth:3,
        backgroundColor:"white",
        borderStyle:"solid",
        borderColor: "rgba(176, 145, 0, 0.9)",
        borderRadius:6,
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,
    }, 
    image:{
        height:20,
        width:20
      },
      touchableL:{
        textAlign:"center",
        width:150,
        height:20,
        alignSelf:'center',
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgba(84, 78, 73, 0.9)",
        justifyContent: "center",
        backgroundColor:"rgba(176, 145, 0, 0.9)"
    },
    user: {
        marginTop: 10,
        fontSize: 24,
        marginLeft: '0',
        fontWeight: 'bold',
        flexDirecion: 'wrap',
        textAlign: 'center'
        
    }
})

export default Buscador;



