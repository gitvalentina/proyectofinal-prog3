import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text} from 'react-native';
import firebase from 'firebase';
import {db, auth} from '../../firebase/config'

class Comentario extends Component {
    //llegan desde el componente de Post
    constructor(props){
        super(props)
        this.state ={
            //lo que le va a llegar a comentarios desde post
            nuevoComentario:'', //lo que escribe el usuario
            id:this.props.route.params.id, //busca el id que coincide con los coments
            comentarios: [] //el array con comentarios anteriores
        }
    }
    //se va a buscar a posteos el posteo que tenga el id y lo que quiero recuperar es toda la data
    componentDidMount(){
        db.collection('posts')
        .doc(this.state.id)
        .onSnapshot(doc => {
        this.setState({
            comentarios: doc.data().comentarios
        })
        })
    }
    newComment(text){
        db.collection('posts')
        .doc(this.state.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email, comentario: text, 
                createdAt: Date.now()
            })
        })
        .then(()=>{
            this.setState({
                nuevoComentario:'text'
            })
        })
        .catch(err => console.log(err)) 

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.texto3}> Comentarios </Text>
                {this.state.comentarios.length === 0 ?
                    <View > 
                        <Text style={{color:"black", textAlign:"center"}}> Aún no hay comentarios. Que quieres decir? </Text>  
                    </View>
                    :
                    <FlatList
                    data={this.state.comentarios}
                    keyExtractor={newComentario => newComentario.createdAt.toString()}
                    renderItem={({item})=> 
                    <Text>
                        {item.owner} 
                        comentario:{item.comentario}
                    </Text>
                    }
                    />
                }  
                <TextInput
                    placeholder='Agregar comentario'
                    keyboardType='default'
                    onChangeText={text=> this.setState({nuevoComentario: text})}
                    style = {styles.input}
                    value={this.state.nuevoComentario}
                />
                {this.state.nuevoComentario === '' ? <></>
                    :
                    <TouchableOpacity onPress={()=> this.newComment(this.state.nuevoComentario, this.state.id)}>
                        <Text> Agregar Comentario </Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        marginTop:40,
        paddingTop:100,
        paddingHorizontal: 10,
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
    texto3:{
        color:'black',
        fontSize: 40,
        textAlign: 'center'
    }
})

export default Comentario;