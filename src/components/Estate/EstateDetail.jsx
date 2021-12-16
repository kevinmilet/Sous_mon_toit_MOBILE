import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getOneEstate, getEstateCover, getEstatePictures } from '../../API/ApiEstates';
import { COVER_ESTATE_BASE_URL } from '@env';
import { FontAwesome5 } from '@expo/vector-icons';
import Topbar from "../Topbar/Topbar";
import colors from '../../utils/styles/colors';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const EstateDetail = ({ route }) => {

    const { estateId } = route.params;
    const [oneEstateData, setOneEstateData] = useState({})
    const [pictureCover, setPictureCover] = useState({})
    const [picturesList, setPicturesList] = useState([{}])
    // const [loading, setLoading] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [imageIndex , setImageIndex] = useState(0);

    useEffect(() => {
        // setTimeout(() => setLoading(false), 2000)
        // Récupération des données de l'estate
        getOneEstate(estateId)
            .then(res => {
                if (res.data === "aucun resultat") {
                    console.log('aucun bien')
                }
                setOneEstateData(res.data)
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {

                //Image de couverture du bien
                getEstateCover(estateId)
                    .then(res => {
                        setPictureCover(res.data[0])
                    }).catch(error => {
                        console.log(error.message)
                    }).finally(() => {

                        // liste des images du bien
                        getEstatePictures(estateId)
                            .then(res => {
                                setPicturesList(res.data)
                            }).catch(error => {
                                console.log(error.message)
                            }).finally(() => {
                                // setLoading(false)
                                // console.log('loading a false')
                            })
                    })
            })
    }, [estateId])

    // Création du tableau d'images pour le viewer d'image
    const images = [];
    picturesList.map((picture) => {
        images.push({url:COVER_ESTATE_BASE_URL + picture.alt});
    });

    return (

        // !loading &&

        <View style={styles.container}>
            <Topbar />
            <ScrollView style={styles.containerDetail}>

                <Text style={{ textAlign: "center", color: "white" }}>Référence du biens : {oneEstateData.reference}</Text>
                {/* <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: COVER_ESTATE_BASE_URL + pictureCover.name }}
                        style={{ height: 150, width: '80%', resizeMode: 'cover', borderRadius: 15 }}
                    />
                </View> */}
                <View style={{ height: 150, width: "100%", alignItems: 'center' }}>
                    <FlatList
                        data={picturesList}
                        horizontal={true}
                        keyExtractor={(item,index) => index}
                        renderItem={({ item,index }) => {
                            return(
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{setVisibleModal(true); setImageIndex(index)}}
                                    >
                                        <Image 
                                            source={{ uri: COVER_ESTATE_BASE_URL + item.alt }}
                                            style={{ height: 150, width: 150, resizeMode:'cover' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                <Modal visible={visibleModal} transparent={true}>
                    <ImageViewer 
                        imageUrls={images} 
                        index={imageIndex} 
                        enableSwipeDown={true}
                        onCancel={()=>setVisibleModal(false)}
                        renderFooter={()=>{
                            return(
                                <TouchableOpacity  style={{flexDirection:"row", alignItems:"flex-end", padding:20}} onPress={() => setVisibleModal(false)}>
                                    <Text style={{textAlign:"right", width:"100%"}}><FontAwesome5 name="times-circle" color="white" size={45}/></Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </Modal>
                </View>

                <Text style={{ fontSize: 20, textAlign: "right", color: "black", marginRight: 10 }}>Prix: {oneEstateData.price}€</Text>

                <Text style={{ fontSize: 30, color: colors.primaryBtn }}>{oneEstateData.title}</Text>
                <Text style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}>{oneEstateData.description}</Text>

                <Text style={{ fontSize: 30, marginTop: 15, color: colors.primaryBtn }}>Caractèristiques</Text>
                <Text style={{ fontSize: 20, marginTop: 15, textDecorationLine: "underline" }}>Général</Text>
                <Text style={{ color: "white" }}>Année de construction : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.year_of_construction}</Text></Text>
                <Text style={{ color: "white" }}>Surface habitable au sol : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.living_surface}m²</Text></Text>
                <Text style={{ color: "white" }}>Surface habitable ( selon Loi Carrez ) : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.carrez_law}m²</Text></Text>
                <Text style={{ color: "white" }}>Superficie du terrain : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.land_surface}m²</Text></Text>

                <Text style={{ fontSize: 20, marginTop: 15, textDecorationLine: "underline" }}>Aspects financiers</Text>
                <Text style={{ color: "white" }}>Prix : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.price}€</Text></Text>
                <Text style={{ color: "white" }}>Taxe foncière : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.property_charge}€</Text></Text>
                <Text style={{ color: "white" }}>Charges locatives : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.rental_charge ? oneEstateData.rental_charge + "€" : "non renseigné"}</Text></Text>
                <Text style={{ color: "white" }}>Charges de co-propriété : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.coownership_charge ? oneEstateData.coownership_charge + "€" : "non renseigné"}</Text></Text>

                <Text style={{ fontSize: 20, marginTop: 15, textDecorationLine: "underline" }}>Interieur</Text>
                <Text style={{ color: "white" }}>Nombre de pièces : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_rooms} pièces</Text></Text>
                <Text style={{ color: "white" }}>Nombre de salle de bain : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_bathrooms} pièces</Text></Text>
                <Text style={{ color: "white" }}>Nombre de sanitaire : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_sanitary} pièces</Text></Text>
                <Text style={{ color: "white" }}>Nombre de cuisine : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_kitchen} pièces</Text></Text>
                <Text style={{ color: "white" }}>Type de cuisine : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.type_kitchen}</Text></Text>
                <Text style={{ color: "white" }}>Type de chauffage : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.heaters}</Text></Text>

                <Text style={{ fontSize: 20, marginTop: 15, textDecorationLine: "underline" }}>Extérieur</Text>
                <Text style={{ color: "white" }}>Balcon : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_balcony}</Text></Text>
                <Text style={{ color: "white" }}>Garage : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_garage}</Text></Text>
                <Text style={{ color: "white" }}>Parking : <Text style={{ fontWeight: 'bold', color: "black" }}>{oneEstateData.nb_parking}</Text></Text>

                <Text style={{ fontSize: 30, marginTop: 15, color: colors.primaryBtn }}>Les plus</Text>
                {oneEstateData.communal_heating ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Chauffage collectif</Text> : null}
                {oneEstateData.furnished ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Meublé</Text> : null}
                {oneEstateData.private_parking ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Parking privé</Text> : null}
                {oneEstateData.handicap_access ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Accès handicapé</Text> : null}
                {oneEstateData.cellar ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Cave</Text> : null}
                {oneEstateData.terrace ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Terrace</Text> : null}
                {oneEstateData.swimming_pool ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Piscine</Text> : null}
                {oneEstateData.fireplace ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Cheminée</Text> : null}
                {oneEstateData.all_in_sewer ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Tout à l'égout</Text> : null}
                {oneEstateData.septik_tank ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Fosse septique</Text> : null}
                {oneEstateData.attic ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Grenier</Text> : null}
                {oneEstateData.elevator ? <Text style={{ fontWeight: 'bold', color: "black" }}><FontAwesome5 name="check-circle" size={24} color="white" /> Ascensseur</Text> : null}

                <Text style={{ fontSize: 30, marginTop: 15, color: colors.primaryBtn }}>Contactez l'agence</Text>
                <Text>Ce bien vous a tapé dans l'oeil ? Vous n'en dormez plus la nuit ?
                    N'hesitez plus et contactez votre agence dès maintenant !</Text>
                <Text>Appeler directement au <Text>03 21 15 87 99</Text></Text>
                <Text>Ou ecrivez nous a : laforet.gerard.smt@gmail.com</Text>

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    containerDetail: {

        margin: 10,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: colors.secondaryBtn,
        borderRadius: 10,
    },
})

export default EstateDetail;