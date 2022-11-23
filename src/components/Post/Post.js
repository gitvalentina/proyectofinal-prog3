import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import {auth, db} from '../../firebase/config';
import firebase from 'firebase';
import {FontAwesome} from '@expo/vector-icons';


class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likeStart: false, //su estado arranca en false
            cantidadDeLikes: this.props.data?.likes.length, //length del array de likes.
            cantidadDeComentarios: this.props.data?.comentarios
        }
    }
    componentDidMount(){
        //chequear si esta logueado preguntando en el if si "myLike" incluye al usuario logueado
        let myLike = this.props.data?.likes.includes(auth.currentUser.email)
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
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //FieldValue chek q sea un array lo q vamos a actualizar
            //arrayUnion/Remove ns permite actualizar en firebase el array de likes (importar antes firebase)
            //auth.current... nos trae el email del usuario logueado; 1ro importar auth
            //likes: nos devuelve un obj literal y le aclaramos la prop que queremos acualizar; por cada like pasar nuestro email de usuario
        })
        .then(()=> //promesa 
            this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                likeStart: true, 
            })
        )
        .catch(err => console.log(err))
    }

    unLike(){ // igual que like pero usar arrayRemove
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes :firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>
            this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes -1,
                likeStart: false,
            })
        )
        .catch(err => console.log(err)) 
    }

    render(){
        return( //primero <Image>
            <View style={styles.posteo}>
                <Image style={styles.image} source={this.props.data?.photo} resizeMode={'contain'}/>
                <View style={styles.data}>
                    <Text style={{fontSize:24, fontWeight: 'bold', margin:8}}> {this.props.data?.description} </Text>
                    <Text style={{fontSize:16, paddingBottom:8}} onPress={()=> this.props.navigation.navigate('ProfileUser',  { email: this.props.data?.owner })} >
                        {this.props.data?.owner}
                    </Text>
                    <Text style={{fontSize:16, paddingBottom:8}}> Likes: {this.state.cantidadDeLikes} </Text>
                    { this.state.likeStart ? //si es true nos presenta el boton unlike y sino el like 
                        <TouchableOpacity onPress={ ()=> this.unLike() }>
                            <FontAwesome name='heart' color= 'black'  size= {20} />
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity onPress={ ()=> this.like() }>
                            <FontAwesome name='heart-o' color= 'red'  size= {20} />
                        </TouchableOpacity>
                    }
                </View>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comentario', 
                    {id: this.props.id})}> 
                        <Text>Ver Comentarios</Text> 
                    </TouchableOpacity>
                
            </View>
        ) //obj literal de clave-valor para darle un id al comentario y identificarlo
    }
}

const styles = StyleSheet.create({
    image:{
        height: 300,
        width: 400,
        resizeMode: 'contain',
        margin:15,
        borderWidth:'radius'
        },
    posteo:{
        marginBottom: 60,
        backgroundColor: 'lightgrey',
        alignItems:'center'
        },
    data:{
        //margin:10,
        alignItems:'center',
        backgroundColor: 'rgb(255,255,242)',
        fontFamily: 'monospace',
        fontSize: 20,
        textAlign: 'center',
        color: 'rgb(128, 128, 128)',
        margin: 21
      }
})

export default Post;