import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getOneEstate, getEstatePictures } from '../../API/ApiEstates';
import { COVER_ESTATE_BASE_URL } from '@env';
import { FontAwesome5 } from '@expo/vector-icons';
import Topbar from "../Topbar/Topbar";
import colors from '../../utils/styles/colors';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Moment from 'moment';
import Loader from "../../Tools/Loader/Loader";

const EstateDetail = ({ route }) => {

    const { estateId } = route.params;
    const [oneEstateData, setOneEstateData] = useState({})
    const [picturesList, setPicturesList] = useState([{}])
    const [visibleModal, setVisibleModal] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Récupération des données de l'estate
        getOneEstate(estateId)
            .then(res => {
                if (res.data === "aucun resultat") {
                    console.warn('aucun bien')
                }
                setOneEstateData(res.data)
            }).catch(error => {
                console.error(error.message)
            }).finally(() => {
                // liste des images du bien
                getEstatePictures(estateId)
                    .then(res => {
                        setPicturesList(res.data)
                    }).catch(error => {
                        console.error(error.message)
                    }).finally(() => {
                        setLoading(false)
                    })
            })
    }, [estateId])

    //Fonction de formatage du prix
    const formatPrice = (price, separator) => {

        let roundPrice = Math.round(price);
        // priceFormated = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format( priceFormated )

        roundPrice = '' + roundPrice;
        separator = separator || ' ';
        let priceFormated = '',
            d = 0;
        while (roundPrice.match(/^0[0-9]/)) {
            roundPrice = roundPrice.substring(1);
        }
        for (let i = roundPrice.length - 1; i >= 0; i--) {
            priceFormated = (d !== 0 && d % 3 === 0) ? roundPrice[i] + separator + priceFormated : roundPrice[i] + priceFormated;
            d++;
        }

        return priceFormated;
    };

    // Création du tableau d'images pour le viewer d'image
    const images = [];
    picturesList.map((picture) => {
        images.push({ url: COVER_ESTATE_BASE_URL + picture.name });
    });

    if (loading) {
        return <Loader/>;
    }
    return (

        <View style={styles.container}>
            <Topbar />
            <ScrollView >
                <Text style={{ textAlign: "center", color: colors.primary, marginVertical: 10 }}>Référence du bien : {oneEstateData.reference}</Text>
                <View style={{ height: 150, width: "100%", alignItems: 'center' }}>
                    <FlatList
                        data={picturesList}
                        horizontal={true}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={() => { setVisibleModal(true); setImageIndex(index) }}
                                    >
                                        {item.cover == 1
                                            ?
                                            <Image
                                                source={{ uri: COVER_ESTATE_BASE_URL + item.name }}
                                                style={{ height: 150, width: 150, resizeMode: 'cover', borderWidth: 3, borderColor: colors.primaryBtn }}
                                            />
                                            :
                                            <Image
                                                source={{ uri: COVER_ESTATE_BASE_URL + item.name }}
                                                style={{ height: 150, width: 150, resizeMode: 'cover' }}
                                            />
                                        }
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
                            onCancel={() => setVisibleModal(false)}
                            renderFooter={() => {
                                return (
                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "flex-end", padding: 20 }} onPress={() => setVisibleModal(false)}>
                                        <Text style={{ textAlign: "right", width: "100%" }}><FontAwesome5 name="times-circle" color="white" size={45} /></Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </Modal>
                </View>

                <View style={styles.containerPrice}>
                    <Text style={styles.textPrice}>Prix: {formatPrice(oneEstateData.price)}&nbsp;€</Text>
                </View>

                <Text style={{ fontSize: 30, color: colors.primaryBtn, padding: 20 }}>{oneEstateData.title}</Text>

                <View style={styles.containerDetail}>
                    <Text style={{ fontSize: 30, color: "white" }}>Caractèristiques</Text>

                    <Text style={{ fontSize: 20, marginTop: 10, textDecorationLine: "underline", color: colors.primaryBtn }}>Général</Text>
                    <Text style={{ color: "black" }}>Année de construction : <Text style={{ fontWeight: 'bold', color: "white" }}>{Moment(oneEstateData.year_of_construction).format('YYYY')}</Text></Text>
                    <Text style={{ color: "black" }}>Surface habitable au sol : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.living_surface}m²</Text></Text>
                    <Text style={{ color: "black" }}>Surface habitable (Loi Carrez) : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.carrez_law}m²</Text></Text>
                    <Text style={{ color: "black" }}>Superficie du terrain : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.land_surface}m²</Text></Text>

                    <Text style={{ fontSize: 20, marginTop: 10, textDecorationLine: "underline", color: colors.primaryBtn }}>Aspects financiers</Text>
                    <Text style={{ color: "black" }}>Prix : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.price}€</Text></Text>
                    <Text style={{ color: "black" }}>Taxe foncière : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.property_charge}€</Text></Text>
                    <Text style={{ color: "black" }}>Charges locatives : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.rental_charge ? oneEstateData.rental_charge + "€" : "non renseigné"}</Text></Text>
                    <Text style={{ color: "black" }}>Charges de co-propriété : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.coownership_charge ? oneEstateData.coownership_charge + "€" : "non renseigné"}</Text></Text>

                    <Text style={{ fontSize: 20, marginTop: 10, textDecorationLine: "underline", color: colors.primaryBtn }}>Interieur</Text>
                    <Text style={{ color: "black" }}>Nombre de pièces : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_rooms} pièces</Text></Text>
                    <Text style={{ color: "black" }}>Nombre de salle de bain : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_bathrooms} pièces</Text></Text>
                    <Text style={{ color: "black" }}>Nombre de sanitaire : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_sanitary} pièces</Text></Text>
                    <Text style={{ color: "black" }}>Nombre de cuisine : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_kitchen} pièces</Text></Text>
                    <Text style={{ color: "black" }}>Type de cuisine : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.type_kitchen}</Text></Text>
                    <Text style={{ color: "black" }}>Type de chauffage : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.heaters}</Text></Text>

                    <Text style={{ fontSize: 20, marginTop: 10, textDecorationLine: "underline", color: colors.primaryBtn }}>Extérieur</Text>
                    <Text style={{ color: "black" }}>Balcon : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_balcony}</Text></Text>
                    <Text style={{ color: "black" }}>Garage : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_garage}</Text></Text>
                    <Text style={{ color: "black" }}>Parking : <Text style={{ fontWeight: 'bold', color: "white" }}>{oneEstateData.nb_parking}</Text></Text>
                </View>

                <View style={styles.containerDescription}>
                    <Text style={{ fontWeight: "bold" , fontSize: 30 , color: colors.primaryBtn}}>Description</Text>
                    <Text >{oneEstateData.description}</Text>
                </View>

                <View style={styles.containerPlus}>
                    <Text style={{ fontSize: 30, color: "white", marginBottom:10 }}>Les plus</Text>
                    {oneEstateData.communal_heating ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Chauffage collectif</Text> : null}
                    {oneEstateData.furnished ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Meublé</Text> : null}
                    {oneEstateData.private_parking ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Parking privé</Text> : null}
                    {oneEstateData.handicap_access ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Accès handicapé</Text> : null}
                    {oneEstateData.cellar ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Cave</Text> : null}
                    {oneEstateData.terrace ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Terrace</Text> : null}
                    {oneEstateData.swimming_pool ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Piscine</Text> : null}
                    {oneEstateData.fireplace ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Cheminée</Text> : null}
                    {oneEstateData.all_in_sewer ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Tout à l'égout</Text> : null}
                    {oneEstateData.septik_tank ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Fosse septique</Text> : null}
                    {oneEstateData.attic ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Grenier</Text> : null}
                    {oneEstateData.elevator ? <Text style={{ fontWeight: 'bold', color: "white" }}><FontAwesome5 name="check-circle" size={24} color={colors.primaryBtn} /> Ascensseur</Text> : null}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
    },
    containerPrice: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    textPrice: {
        borderRadius: 10,
        padding: 3,
        paddingEnd: 15,
        paddingStart: 15,
        fontSize: 25,
        color: "white",
        backgroundColor: colors.secondaryBtn,
        marginRight: 10,
        marginTop:10,

    },
    containerDetail: {
        marginHorizontal: 10,
        alignSelf: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: colors.secondaryBtn,
        borderRadius: 20,

    },
    containerDescription:{
        backgroundColor: "white",
        margin:10,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10 ,
        borderWidth:3,
        borderColor: colors.secondary,
    },
    containerPlus: {
        backgroundColor: colors.secondaryBtn,
        alignSelf: "flex-end",
        padding: 15,
        borderRadius: 20,
        margin: 10,
        marginTop:0,
    },
})

export default EstateDetail;
