import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import Camara from '../../components/Camara';
import {auth, db} from '../../firebase/config'

class NewPost extends Component {
    constructor(props){
        super(props)
            this.state={
                text:'',
                createdAt:'',
                photo:'',
                showCamera: true
            }
        }
    
    enviarPost(){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: this.state.text,
            likes:[],
            comments:[],
            photo: this.state.photo
        })
        .then(()=>{
            this.setState({
                text:'',
                photo:'',
                showCamera: true
            })
            this.props.screenprops.navigation.navigate("Home")
        })
        .catch((err)=> console.log(err))
    }

    subirImagen(url){
        this.setState({
            showCamera: false,
            photo: url
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.showCamera ?
                    <Camara subirImagen = {(url)=> this.subirImagen(url)}/> 
                    :
                    <View>
                        <TextInput style={styles.input}
                            keyboardType="default"
                            placeholder="Título"
                            onChangeText={text => this.setState({text: text})}
                            value={this.state.text} 
                        />
                        {
                            this.state.text === '' ? 
                                <TouchableOpacity style={styles.touchableL}    >
                                    <Text style={styles.texto}>Crea tu posteo</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.touchableL}   onPress={()=> this.enviarPost()} >
                                    <Text style={styles.texto}>Crea tu posteo</Text>
                                </TouchableOpacity>
                        }
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"lightgray",
        height:"100%",
    }, 
    texto:{
        fontSize:15,
        textAlign:'center'
    },
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

export default NewPost;
