import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {auth, db} from '../../firebase/config';
import Post from "../../components/Post/Post";

class ProfileUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:[],
            posts:[],
            email:'',
            bio:'',
            photo:'',
        }
    };
    componentDidMount(){
            db.collection('posts')
            .where('owner', '==', this.props.route.params.email )
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
            .where("owner", "==", this.props.route.params.email)
            .onSnapshot(
                docs => {
                    let user = [];
                    docs.forEach( doc => {
                        user.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            user: user[0].data
                        })
                    }) 
                }
            )
        }
    render() {
        console.log(this.props)
        return (
            <View>
                <Text> {this.state.user.username}</Text>
                <Text>{this.state.user.bio}</Text>
                <Text>{this.state.user.owner}</Text>
                <Text> Fecha de último login: {auth.currentUser.metadata.lastSignInTime} </Text>
                <Text>Cantidad de posts: {this.state.posts.length}</Text>
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

const styles = StyleSheet.create({})

export default ProfileUser;
