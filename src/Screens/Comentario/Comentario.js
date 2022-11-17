import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
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
            data:{},// la data de los posts con el id que buscamos
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
                nuevoComentario:''
            })
        })
        .catch(err => console.log(err)) 

    }

    render() {
        return (
            <View>
                <Text> Comentarios </Text>
                {this.state.comentarios.length === 0 ?
                    <View > 
                        <Text> Aún no hay comentarios. Que quieres decir? </Text>  
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
    input: {
        borderWidth:1,
        height:32
      }
})

export default Comentario;