import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';

//base del otro proyecto 
class Buscador extends Component{ //capturar valores
    constructor(props){ // Representan información que es enviada al momento en el que un componente es utilizado. 
        super(props) //componente hijo de Home
        this.state={
            valorInput:'',
            posts:[]
        }
    }

    buscar(text){
    
        this.setState({valorInput:text})
        db.collection('users').where('owner', '==', text).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                    })
                })
                
            }
        )
    }

    render(){
        return( <View>
            <TextInput
                style={styles.input}
                placeholder='Search Users'
                keyboardType="default"
                onChangeText={text => this.buscar(text)}
                value={this.state.valorInput}/>
                <TouchableOpacity style={styles.touchableL} onPress={()=> this.buscar()} >
                    <Text>Buscar</Text> 
                </TouchableOpacity>
                
                <FlatList 
                            data={this.state.posts}
                            keyExtractor={ onePost => onePost.id.toString()}
                            renderItem={ ({item})  =><TouchableOpacity onPress={()=>this.props.navigation.navigate('ProfileUser')}>
                                 { this.state.valorInput == item.data.owner ?
                         <Text>{item.data.owner}</Text> : <Text>no exsiste el usuario</Text> }
                            </TouchableOpacity> }
                        /> 
            </View>
            )
    
    }
}
//el evento onChange: para obtener la info que el usuario ingresa en el campo. el estado del componente se actualizará cada vez que el usuario ingrese un carácter.
const styles=StyleSheet.create({
    input:{
        height: 30,
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
})

export default Buscador;



