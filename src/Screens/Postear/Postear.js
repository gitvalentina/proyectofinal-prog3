import React, { Component } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Camara from '../../components/Camara';
import {auth, db} from '../../firebase/config'

class Postear extends Component {
    constructor(props){
        super()
            this.state={
                text:'',
                createdAt:'',
                photo:'',
                showCamera: true

            }
        }
    

    enviarPost(description){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
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
                <Camara
                subirImagen = {(url)=> this.subirImagen(url)}
                /> :
                <View>
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="Título"
                        onChangeText={text => this.setState({title:text})}
                        value={this.state.text} 
                    />
                    {this.state.title.length==0|| this.state.description.length==0? 
                        <TouchableOpacity style={styles.touchablegray}    >
                            <Text style={styles.texto}>Crea tu posteo</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity style={styles.touchable}   onPress={()=> this.submitPost()} >
                            <Text style={styles.texto}>Crea tu posteo</Text>
                        </TouchableOpacity>}
                </View>
                }
            </View>);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        height:"100%",
    }, 
    input: {
        height: 20,
        borderWidth:1,
        borderStyle:"solid",
        borderColor: "#ccc",
        borderRadius:6,
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,
    },
})

export default Postear;
