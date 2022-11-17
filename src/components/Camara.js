import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {Camera} from 'expo-camera';
 import {storage} from '../firebase/config';


//Creamos el componente Camara para que lo utilicen nuestros posteos
class Camara extends Component {
    constructor(){
        super()
        this.state={
            showCamara: false,
            fotoUri:'' //uri de la foto en la memoria interna del dispositivo
        }
        this.metodosDeCamara
    }

    componentDidMount(){ //1- solicitamos permisos a la camara del usuario c el metodo permission del componente Camera instalado; nos retorna un booleano que modifica el estado
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                showCamara: true
            })
        })
        .catch(e=> console.log(e))

    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(foto => this.setState({
            fotoUri: foto.uri,
            showCamara:false
        }))
        .catch(err => console.log(err))
    }

    aceptarImagen(){ //para guardar la foto
        fetch(this.state.fotoUri) //pega la url donde guarde la foto q subi, traemos recursos propios de nuestro proyecto
        .then(res=>res.blob()) // recibimos una respuesta de imagen en binario; el metodo blob nos retorna el booleano y un formato apto para firebase
        .then (imagen=>{ 
            const ref = storage.ref(`fotos/${Date.now()}.jpg`) //llamo al storage con el metodo ref que nos da la referncia de donde guarda firebase la informacion. Con date.now logramos q se llamen todos los archivos distintos
            ref.put(imagen) //mandamos la imagen q recibimos por parametro
            .then(()=> { //si no funciona, hacemos una promesa
                ref.getDownloadURL() //ruta con la q se guarda en firebase
                .then((url)=> this.props.subirImagen(url)) //metodo que recibe del padre por props, actualiza el componente
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                {
                this.state.showCamara ? //si es true muestra la camara
                <>
                    <Camera //hijo de mi componente
                        style={styles.camarabody}
                        type={Camera.Constants.Type.back}
                        ref={metodos => this.metodosDeCamara = metodos } //guarda los metodos de camara en la variable metodos de camara y luego se los pasa al padre
                    />
                    <TouchableOpacity onPress={ () => this.tomarFoto()}>
                        <Text> Adjuntale una foto </Text>
                    </TouchableOpacity>
                </>
                : this.state.showCamara === false && this.state.fotoUri != '' ? //validamos para que nos renderice la imagen si la url es distinto de vacio; siempre que nos de el permiso
                    <View>
                        <Image
                        source={{uri: this.state.fotoUri}}
                        style={styles.image}
                        />
                        <TouchableOpacity onPress={()=> this.aceptarImagen()}>
                            <Text>
                                Aceptar imagen
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=> this.rechazarImagen()}>
                            <Text>
                                Rechazar imagen
                            </Text>
                        </TouchableOpacity>
                    </View>
                : <Text>No me haz dado permisos para mostrar la foto</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camarabody:{
        height:500
    },
    image:{
        height:200
    }
})

export default Camara;
