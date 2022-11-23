import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import {auth, db} from '../../firebase/config';
import Post from '../../components/Post/Post';
import LoginScreen from '../Login/Login';
import MyPost from '../../components/MyPost/MyPost';

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
            let perfil = {}
            doc.forEach(doc => {
                perfil = doc.data();
            })
        this.setState({
            datosPerfil: perfil
        }) , () => console.log(this.state.datosPerfil)
        }
        )

        //para mostrar sus posts
        db.collection('posts')
        .where("owner", "==", auth.currentUser.email)
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

        <> 
                <TouchableOpacity onPress={() => this.signOut()} style={styles.touchable} >
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.texto1}> Perfil de {this.state.datosPerfil.username} </Text>
                    <Text style={styles.texto2}> Bienvenido: {auth.currentUser.email} </Text>
                    <Text style={styles.texto2}> Foto de Perfil: </Text>
                    <Image
                        style={styles.foto}
                        source={{
                            uri: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png"
                        }}
                        resizeMode='contain'
                    />
                    <Text style={styles.texto2}> Biografia: {this.state.datosPerfil.biografia} </Text>
                    <Text style={styles.texto2}> Fecha de creación: {auth.currentUser.metadata.creationTime} </Text>
                    <Text style={styles.texto3}> Ha subido un total de {this.state.post.length} posteos </Text>
                    <FlatList 
                                data = {this.state.post}
                                keyExtractor={(data)=> data.id.toString()}
                                renderItem = {(item) => <MyPost  
                                    navigation= {this.props.navigation} 
                                    id= {item.item.id} 
                                    data={item} />} 
                            />
                </View>
        </>  
            
            
    
        )
    }
}

const styles = StyleSheet.create({
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
    texto1:{
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'left',     
        marginTop:'2%',
        textAlign: 'center'
    },
    texto2:{
        fontSize: 20,
        textAlign: 'left',
        marginTop:'2%',
        textAlign: 'center'
        
    },
    texto3:{
        fontSize: 20,
        textAlign: 'left',
        marginTop:'2%',
        textAlign: 'flex-start'
        
    },
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"lightgray",
        height:"100%",
    }, 
    foto: {
        height: 150,
		width: 150,
		marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
    }
})

export default Profile;

