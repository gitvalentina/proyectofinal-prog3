import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likeStart: false, //su estado arranca en false
            cantidadDeLikes: this.props.data.likes.length //length del array de likes.
        }
    }
    componentDidMount(){
        //chequear si esta logueado preguntando en el if si "myLike" incluye al usuario logueado
        let myLike = this.props.data.likes.includes(auth.currentUser.email)
       // Si esta logueado cambiar el estado de likeStart
        if(myLike){
            this.setState({
                likeStart: true
            })
        }
    }

    //metodo para cambiar el estado del like dependiendo del usuario
    like(){
        db.collection('posts') //seleccionamos la coleccion posts
        .doc(this.props.id) //identificamos el documento sobre el cual estamos trabajando (cada posteo); 
                            //se identifica con el id capturado en el home, con el snapshot; se recibe por las props
        .update({
            likes: firebase.firestone.FieldValue.arrayUnion(auth.currentUser.email) //FieldValue chek q sea un array lo q vamos a actualizar
            //arrayUnion/Remove ns permite actualizar en firebase el array de likes (importar antes firebase)
            //auth.current... nos trae el email del usuario logueado; 1ro importar auth
            //likes: nos devuelve un obj literal y le aclaramos la prop que queremos acualizar; por cada like pasar nuestro email de usuario
        })
        .then(()=>{ //promesa 
            this.setState({
                likeStart: true,
                cantidadDeLikes: this.state.cantidadDeLikes +1 
            })
        })
        .catch(err => console.log(err))
    }

    unLike(){ // igual que like pero usar arrayRemove
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likeStart: false,
                cantidadDeLikes: this.state.cantidadDeLikes - 1
            })
        })
        .catch(err => console.log(err)) 
    }

    render(){
        return( //primero <Image>
            <View>
                <View>
                    <Text> {this.props.data.description} </Text>
                    <Text> Cantidad de Likes: {this.state.cantidadDeLikes} </Text>
                    { this.state.likeStart ? //si es true nos presenta el boton unlike y sino el like 
                        <TouchableOpacity onPress={ ()=> this.unlike() }>
                            <FontAwesome name='heart' color= 'black'  size= {16} />
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity onPress={ ()=> this.like() }>
                            <FontAwesome name='heart-o' color= 'red'  size= {16} />
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', 
                    {id: this.props.id})}> 
                        <Text>Agregar comentario</Text> 
                    </TouchableOpacity>
                </View> 
            </View>
        ) //obj literal de clave-valor para darle un id al comentario y identificarlo
    }
}

const styles = StyleSheet.create({

})

export default Post;