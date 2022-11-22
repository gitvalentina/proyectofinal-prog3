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
            post:[] //el array con comentarios anteriores
        }
    }
    //se va a buscar a posteos el posteo que tenga el id y lo que quiero recuperar es toda la data
    componentDidMount(){
        db.collection('posts')
        .doc(this.state.id)
        .onSnapshot(doc => {
        this.setState({
            post: doc.data(),
        })
        })
    }
    newComment(text){
        db.collection('posts')
        .doc(this.state.id)
        .update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email, 
                nuevoComentario: text, 
                createdAt: Date.now()
            })
        })
        .then(()=>{
            this.setState({
                nuevoComentario:''
            })
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.texto3}> Comentarios </Text>
                {this.state.post?.comments?.length === 0 ?
                    <View> 
                        <Text style={{color:"black", textAlign:"center"}}> Aún no hay comentarios. Que quieres decir? </Text>  
                    </View>
                    :
                    <>
                    <FlatList
                        data={this.state.post.comments}
                        style={styles.containerP}
                        keyExtractor={newComentario => newComentario.createdAt.toString()}
                        renderItem={({item})=> <>
                            <Text>
                                {item.owner} comentario: {item.nuevoComentario}
                            </Text> 
                        </>
                    }
                    />
                    </>
                }
                <TextInput
                    placeholder='Agregar comentario'
                    keyboardType='default'
                    onChangeText={text=> this.setState({nuevoComentario: text})}
                    style = {styles.input}
                    value={this.state.nuevoComentario}
                />
                {this.state.nuevoComentario === ''?
                    <TouchableOpacity>
                        <Text style={styles.touchable}> Agregar Comentario </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=> this.newComment(this.state.nuevoComentario, this.state.id)}>
                        <Text style={styles.touchable}> Agregar Comentario </Text>
                    </TouchableOpacity>
                }
              
            </View>
        )
    }
  }

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        paddingTop:100,
        paddingHorizontal: 10,
        height:"100%",
        },
        touchable:{
            padding: 10,
            width:200,
            alignSelf:'flex-end',
            alignItems:'center',
            backgroundColor: "rgba(176, 145, 0, 0.9)",
            marginTop: 10,
            borderRadius:4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderStyle:"solid",
            borderWidth:2,
            borderColor:"black"
        },
    containerP:{
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"lightgray",
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
        justifyContent: 'flex-start'
    }, 
    texto3:{
        color:'black',
        fontSize: 40,
        textAlign: 'center'
    }
})

export default Comentario;