import React, { Component } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {auth, db} from '../../firebase/config'
import Post from '../../components/Post'
import {LoginScreen} from '../Login/Login'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            post : []
        }
    }
    componentDidMount(){
        //para mostrar sus posts
        db.collection('posts').where("user", "==", `${auth.currentUser.email}`.onSnapShot((docs)=>{
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
        }))
        
    }
    render() {
        return (
            <View style={styles.container}>
                <Text > Bienvenido: {auth.currentUser.email} conocido como: {auth.currentUser.displayName} </Text>
                <Text > Fecha de creación: {auth.currentUser.metadata.creationTime} </Text>
                <Text > Fecha de último loguin: {auth.currentUser.metadata.lastSignInTime} </Text>
                <Text > Ha subido un total de {this.state.post.length} posteos </Text>
            <Flatlist
                data={this.state.post}
                keyExtractor={(data)=> data.id.toString()}
                renderItem={(item)=><Post data={item.data}/>}
            />
            {/* <TouchableOpacity style={styles.touchable} onPress={()=> this.props.desloguearse()}>
                    <Text style={styles.texto}>Desloguearse</Text> </TouchableOpacity> */}
            
            </View>
        );
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
