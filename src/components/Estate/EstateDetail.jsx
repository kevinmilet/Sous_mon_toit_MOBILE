import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getOneEstate, getEstateCover, getEstatePictures } from '../../API/ApiEstates';
import { COVER_ESTATE_BASE_URL } from '@env';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../../utils/styles/colors'

const EstateDetail = ({ route }) => {

    const { estateId } = route.params;
    const [oneEstateData, setOneEstateData] = useState({})
    const [pictureCover, setPictureCover] = useState({})
    const [picturesList, setPicturesList] = useState({})
    // const [loading, setLoading] = useState(true);

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

    return (

        // !loading &&

        <View style={styles.container}>
            
            <Text style={{textAlign:"center"}}>Référence du biens : {oneEstateData.reference}</Text>
            <View style={{alignItems: 'center'}}>
                <Image 
                    source={{ uri: COVER_ESTATE_BASE_URL + pictureCover.name }} 
                    style={{ height: 150, width: '80%', resizeMode:'cover', borderRadius:20 }} 
                />
            </View>
            <Text style={{textAlign:"right", color: colors.primaryBtn}}>Prix: {oneEstateData.price}€</Text>
            <FlatList
                data={picturesList}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    <Image source={{ uri: COVER_ESTATE_BASE_URL + item.name }} style={{ height: 100, width: 100 }} />
                }}
            />
            <ScrollView>
                <Text style={{ fontSize: 30 }}>{oneEstateData.title}</Text>
                <Text>{oneEstateData.description}</Text>

                <Text style={{ fontSize: 30 }}>Caractèristiques</Text>
                <Text style={{ fontSize: 20 }}>Général</Text>
                <Text>Année de construction : <Text styles={{ fontWeight: 'bold' }}>{oneEstateData.year_of_construction}</Text></Text>
                <Text>Surface habitable au sol : <Text>{oneEstateData.living_surface}m²</Text></Text>
                <Text>Surface habitable ( selon Loi Carrez ) : <Text>{oneEstateData.carrez_law}m²</Text></Text>
                <Text>Superficie du terrain : <Text>{oneEstateData.land_surface}m²</Text></Text>

                <Text style={{ fontSize: 20 }}>Aspects financiers</Text>
                <Text>Prix : <Text>{oneEstateData.price}€</Text></Text>
                <Text>Taxe foncière : <Text>{oneEstateData.property_charge}€</Text></Text>
                <Text>Charges locatives : <Text>{oneEstateData.rental_charge ? oneEstateData.rental_charge + "€" : "non renseigné"}</Text></Text>
                <Text>Charges de co-propriété : <Text>{oneEstateData.coownership_charge ? oneEstateData.coownership_charge + "€" : "non renseigné"}</Text></Text>

                <Text style={{ fontSize: 20 }}>Interieur</Text>
                <Text>Nombre de pièces : <Text>{oneEstateData.nb_rooms} pièces</Text></Text>
                <Text>Nombre de salle de bain : <Text>{oneEstateData.nb_bathrooms} pièces</Text></Text>
                <Text>Nombre de sanitaire : <Text>{oneEstateData.nb_sanitary} pièces</Text></Text>
                <Text>Nombre de cuisine : <Text>{oneEstateData.nb_kitchen} pièces</Text></Text>
                <Text>Type de cuisine : <Text>{oneEstateData.type_kitchen}</Text></Text>
                <Text>Type de chauffage : <Text>{oneEstateData.heaters}</Text></Text>

                <Text style={{ fontSize: 20 }}>Extérieur</Text>
                <Text>Balcon : <Text>{oneEstateData.nb_balcony}</Text></Text>
                <Text>Garage : <Text>{oneEstateData.nb_garage}</Text></Text>
                <Text>Parking : <Text>{oneEstateData.nb_parking}</Text></Text>

                <Text style={{ fontSize: 30 }}>Les plus</Text>
                {oneEstateData.communal_heating ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Chauffage collectif</Text> : null}
                {oneEstateData.furnished ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Meublé</Text> : null}
                {oneEstateData.private_parking ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Parking privé</Text> : null}
                {oneEstateData.handicap_access ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Accès handicapé</Text> : null}
                {oneEstateData.cellar ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Cave</Text> : null}
                {oneEstateData.terrace ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Terrace</Text> : null}
                {oneEstateData.swimming_pool ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Piscine</Text> : null}
                {oneEstateData.fireplace ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Cheminée</Text> : null}
                {oneEstateData.all_in_sewer ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Tout à l'égout</Text> : null}
                {oneEstateData.septik_tank ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Fosse septique</Text> : null}
                {oneEstateData.attic ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Grenier</Text> : null}
                {oneEstateData.elevator ? <Text><FontAwesome5 name="check-circle" size={24} color={colors.primary} /> Ascensseur</Text> : null}

                <Text style={{ fontSize: 30 }}>Contactez l'agence</Text>
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
        paddingHorizontal:15,
    },
})

export default EstateDetail;