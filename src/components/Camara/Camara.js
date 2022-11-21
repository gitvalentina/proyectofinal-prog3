import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {Camera} from 'expo-camera';
import {storage} from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'


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

    rechazarImagen(){
        this.setState({
            fotoUri: "",
            showCamara: true
        })
    }

    render() {
        return (
            <>
                {
                this.state.showCamara ? //si es true muestra la camara
                <>
                    <Camera //hijo de mi componente
                        style={{flex:1, width:"100%" }}
                        type={Camera.Constants.Type.back}
                        ref={metodos => this.metodosDeCamara = metodos } //guarda los metodos de camara en la variable metodos de camara y luego se los pasa al padre
                    />
                    <TouchableOpacity style={{alignItems:"center"}} onPress={ () => this.tomarFoto()}>
                        <FontAwesomeIcon  style={styles.iconocamara} icon={ faCamera } />
                    </TouchableOpacity>
                </>
                : this.state.showCamara === false && this.state.fotoUri != '' ? //validamos para que nos renderice la imagen si la url es distinto de vacio; siempre que nos de el permiso
                    <View style={styles.container}>
                        <Image
                        source={{uri: this.state.fotoUri}}
                        style={styles.image}
                        />
                        <TouchableOpacity style={styles.text} onPress={()=> this.aceptarImagen()}>
                            <Text style={{fontSize:30, fontWeight: 'bold'}}> ACEPTAR  IMAGEN </Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.text} onPress={()=> this.rechazarImagen()}>
                            <Text style={{fontSize:30, fontWeight: 'bold'}}>
                                RECHAZAR IMAGEN
                            </Text>
                        </TouchableOpacity>
                    </View>
                :   <Text style={{textAlign: 'center', fontSize:25, fontWeight: 'bold'}}> No me diste los permisos </Text>
                    
                
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'lightgrey',
    },
    image:{
        height:300, 
        width:"100%",
        alignContent:"center",
        marginVertical:10
    },
    iconocamara:{
        height:50,
        width:50
    },
    text:{
        height:50,
        alignItems: 'center',
        margin:20
    }
})

export default Camara;
