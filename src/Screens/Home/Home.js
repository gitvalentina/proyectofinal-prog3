import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {auth, db} from '../../firebase/config';
import Post from '../../components/Post';

class Home extends Component{
    constructor(){
        super()
        this.state={
            info:[]
        }
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs=>{ //hacemos una llamada con db.collection a nuestra base d datos en la coleccion posts y on snap trae todo
            let publicaciones = [];
            docs.forEach(docs=>{
                publicaciones.push({
                    id: docs.id, //luego lo usamos en el update. docs es el parametro del forEach
                    data: docs.data() //viene por props de item.data
                })
            }) //foreach es de FB y no de Java; es un bucle de firebase
        })
        this.setState({
            info: publicaciones
        })
    }
    render(){
        return(
            <>
            { this.state.cargado == false?  <ActivityIndicator size="large" color="black" />:
            <View style={styles.container}>
                <FlatList //toma ese estado, le genera una key a cada item y renderiza x cada uno un componente post..
                // a ese comoponente le estamos pasando a traves de la prop .data toda la info que s guarda en cada uno de los items, decalrado anteriormente en el .push de las publicaciones
                data={this.state.info}
                keyExtractor={(data)=> data.id.toString()}
                renderItem={({item})=>( 
                <Post 
                navigation= {this.props.navigation} id= {item.id} 
                data={item.data} /> )}  >
                </FlatList>
            </View>
            }
            </>
        )
    }
}
const styles = StyleSheet.create({

})
export default Home;