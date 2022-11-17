import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {auth, db} from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Post from '../../components/Post';

class Home extends Component{
    constructor(){
        super()
        this.state={
            info:[]
        }
    }
    componentDidMount(){
        db.collection('posts')
        .orderBy("createdAt", "desc").onSnapshot(
            (docs)=>{ //hacemos una llamada con db.collection a nuestra base d datos en la coleccion posts y on snap trae todo
            let publicaciones = [];
            docs.forEach(doc=>{
                publicaciones.push({
                    id: doc.id, //luego lo usamos en el update. docs es el parametro del forEach
                    data: doc.data() //viene por props de item.data
                })
            }) //foreach es de FB y no de Java; es un bucle de firebase
            this.setState({
                info: publicaciones
            })
        })
        
    }
    NewPost(){
        this.props.screenprops.navigation.navigate("NewPost")
    }
    Buscador(){
        this.props.screenprops.navigation.navigate("Buscador")
    }

    render(){
        return(
            <>
            { this.state.cargado == false?  <ActivityIndicator size="large" color="black" />:
            <View style={styles.container1}>
                 <View style={styles.container2}> 
                 <TouchableOpacity  onPress={()=> this.NewPost()} style={styles.image}>
                    <FontAwesomeIcon icon={ faPlus } />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> this.Buscador()} style={styles.image}>
                    <FontAwesomeIcon icon={ faSearch } />
                </TouchableOpacity>
                </View>
                <FlatList //toma ese estado, le genera una key a cada item y renderiza x cada uno un componente post..
                // a ese comoponente le estamos pasando a traves de la prop .data toda la info que s guarda en cada uno de los items, decalrado anteriormente en el .push de las publicaciones
                data={this.state.info}
                keyExtractor={(data)=> data.id.toString()}
                renderItem={(
                    {item})=>
                    <Post 
                    navigation= {this.props.navigation} id= {item.id} 
                    data={item.data} /> 
                }  
                />

            </View>
            }
            </>
        )
    }
}
const styles = StyleSheet.create({
    container1:{
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"lightgray",
        height:"100%",
      },
      container2:{
        flex:3,
        textAlign:"center",
        justifyContent:"space-around",
        flexDirection:"row"
      },
      image:{
        alignItems:"center"
      }
})
export default Home;