import React, { Component } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {auth, db} from '../../firebase/config';
import Post from "../../components/Post/Post";

class ProfileUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            datosAmigo: '',
            mail: props.route.params.email,
            
        }
    };
    componentDidMount(){
            db.collection('posts')
            .where('owner', '==', this.props.route.params.email )
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                docs =>{
                    let posts = [];
                docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                })
                    this.setState({
                        posts: posts,
                    })
                })
                }
            )
            db.collection('users')
            .where("email", "==", this.props.route.params.email)
            .onSnapshot(
                docs => {
                    let user = [];
                    docs.forEach( doc => {
                        this.setState({
                            id: doc.id,
                            datosAmigo: doc.data()
                            
                        })
                    }) 
                }
            )
        }
        
    render() {
        console.log(this.state.datosAmigo);
        return (
            <View style={styles.container}>
                <Text style={styles.texto1}> Perfil de {this.state.datosAmigo.username}</Text>
                <Text style={styles.texto2}>Algo sobre mi:{this.state.datosAmigo.biografia}</Text>
                <Text style={styles.texto2}> Contacto: {this.state.mail}</Text>
                <Text style={styles.texto3}>Cantidad de posts: {this.state.posts.length}</Text>
                <FlatList 
                data={this.state.posts}
                keyExtractor={ onePost => onePost.id.toString()}
                renderItem={ ({item}) => <Post 
                    navigation= {this.props.navigation} 
                    id= {item.id} 
                    data={item.data} />
                }
                />   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    texto1:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',     
        marginTop:'2%',
        textAlign: 'center'
    },
    texto2:{
        fontSize: 15,
        textAlign: 'left',
        marginTop:'2%',
        textAlign: 'flex-start'
        
    },
    texto3:{
        fontSize: 15,
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
})

export default ProfileUser;
