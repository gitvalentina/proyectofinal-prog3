import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import {auth, db} from '../../firebase/config';
import Post from '../../components/Post/Post';
import LoginScreen from '../../Screens/Login/Login';
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
        console.log(this.state.post)
        return (

        <> 
                <View style={styles.container}>
                    <Text > Perfil de {this.state.datosPerfil.username} </Text>
                    <Text> Bienvenido: {auth.currentUser.email} </Text>
                    <Text> Foto de Perfil: </Text>
                    <Text> Biografia: {auth.currentUser.biografia} </Text>
                    <Image
                    style={styles.foto}
                    source={{ uri: this.state.datosPerfil.photo }}
                    resizeMode='contain'
                    />
                    <Text> Fecha de creación: {auth.currentUser.metadata.creationTime} </Text>
                    
                    {this.state.post.length == 0 ? 
                        <Text>Aun no hay posteos</Text>
                        :
                        <View style={styles.container}>
                            <Text> Ha subido un total de {this.state.post.length} posteos </Text>
                            <FlatList 
                                data = {this.state.post}
                                keyExtractor={(data)=> data.id.toString()}
                                renderItem = {(item) => <MyPost data={item} id={item.item.id} />} 
                            />
                        </View>
                    }
        
                        <TouchableOpacity onPress={() => this.signOut()} style={styles.touchable} >
                            <Text>Cerrar sesión</Text>
                        </TouchableOpacity>
                </View>  
            </>
            
           
        )
    }
}

const styles = StyleSheet.create({
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "rgba(176, 145, 0, 0.9)",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgba(176, 145, 0, 0.9)"
    },
    texto:{
        color:"#FFF"
    },
    /* container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"lightgray",
        height:"100%",
    }, */
    foto:{
        width:250,
        height:250
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
            