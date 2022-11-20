import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {auth, db} from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Post from '../../components/Post';
import Buscador from '../Buscador/Buscador';

class Home extends Component{
    constructor(){
        super()
        this.state={
            info:[],
            resultadosDeBusqueda: [], //valor que el usuario pone en el input
            value: ''
        }
    }
    componentDidMount(){
        db.collection('posts')
        .orderBy("createdAt", "desc")
        .limit(5)
        .onSnapshot(
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

    metodoQueBusca(nombre){
        if(nombre !== ''){ {/*esto es porque cuando borraba y ecribia se me salia y entonces si el input esta vacio no hago el fetch */}
            
            fetch(`${this.state.valorInput}`)
            .then(res => res.json())
            .then(data => {
                this.setState({resultadosDeBusqueda: data.results})
            })
            .catch(e => console.log(e))
        }
    }

    metodoQueResetea(){
        this.setState({ // permite actualizar la información del objeto state de un componente. Cuando se modifica, se vuelve a renderizar el componente (no carga la app de cero, sino que cambia ese estado en específico)
            resultadosDeBusqueda: [], //valor que el usuario pone en input
            value: ''
        })
    }
    //Buscador(){
     //   this.props.screenprops.navigation.navigate("Buscador")
   // }

    render(){
        return(
            <>
            <main>
            <Buscador metodoQueBusca={(nombre)=> this.metodoQueBusca(nombre)} metodoQueResetea={() => this.metodoQueResetea()}></Buscador>
            </main>
            { this.state.cargado == false?  <ActivityIndicator size="large" color="black" />:
            <View style={styles.container1}>
                 <View style={styles.container2}> 
                <TouchableOpacity  onPress={()=> this.Buscador()} >
                    <FontAwesomeIcon style={styles.image} icon={ faSearch } />
                </TouchableOpacity>
                </View>
                <FlatList //toma ese estado, le genera una key a cada item y renderiza x cada uno un componente post..
                // a ese comoponente le estamos pasando a traves de la prop .data toda la info que s guarda en cada uno de los items, decalrado anteriormente en el .push de las publicaciones
                data={this.state.info}
                keyExtractor={(data)=> data.id.toString()}
                renderItem={(
                    {item})=>
                    <Post 
                    navigation= {this.props.navigation} 
                    id= {item.id} 
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
        paddingStart:10,
        paddingTop:20,
        flexDirection: 'row'
      },
      image:{
        height:20,
        width:20
      }
})
export default Home;