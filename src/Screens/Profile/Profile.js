import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {auth, db} from '../../firebase/config';
import Post from '../../components/Post';
import {LoginScreen} from '../Login/Login';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            post : [],
            datosPerfil : {},
            id: '',
        }
    }

    componentDidMount(){

        db.collection('users')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
            id: doc.id,
            datosPerfil: doc.data()
          })) 
        })

        //para mostrar sus posts
        db
        .collection('posts')
        .where("user", "==", auth.currentUser.email)
        .onSnapshot((docs)=>{
            let posts =[]
            docs.forEach((doc)=> {
                posts.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            this.setState({
                post:posts
            })
        })
        
    }

    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
      
    render() {
        return (

           <View>
                <>
                <View style={styles.container}>
                    <Text> Perfil {this.state.datosPerfil.username} </Text>
                    <Text> Bienvenido: {auth.currentUser.email} </Text>
                    <Text> Foto de Perfil: me falta</Text>
                    <Text> Bio: tendria q rellenarse </Text> 
                    <Text> Fecha de creación: {auth.currentUser.metadata.creationTime} </Text>
                    <Text> Fecha de último login: {auth.currentUser.metadata.lastSignInTime} </Text>
                    <Text> Ha subido un total de {this.state.post.length} posteos </Text>
                    <Text> Posteos: </Text>
                    {this.state.post.length >= 1 ? 
                        <View style={styles.container}>
                            <FlatList 
                                data = {this.state.post}
                                keyExtractor={(data)=> data.id.toString()}
                                renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} 
                            />
                        </View>
                        :
                        <Text>Aun no hay posteos</Text>
                        }
                </View>
                </>      
                    <Text> Borrar Posteos</Text>     
                        <TouchableOpacity onPress={() => this.signOut()} style={styles.touchable} >
                            <Text>Cerrar sesión</Text>
                        </TouchableOpacity>
            </View>
            
           
        )
    }
}

const styles = StyleSheet.create({
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "red",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"red"
    },
    texto:{
        color:"#FFF"
    },
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        height:"100%",
    }
})

export default Profile;


{/* <FlatList
                data={this.state.post}
                keyExtractor={(data)=> data.id.toString()}
                renderItem={(item)=><Post data={item.data}/>}
            />
             */}

            {/* <TouchableOpacity style={styles.touchable} onPress={()=> this.props.desloguearse()}>
                    <Text style={styles.texto}>Desloguearse</Text> </TouchableOpacity> */}
            