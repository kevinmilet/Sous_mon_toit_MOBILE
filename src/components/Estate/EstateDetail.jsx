import React, { useState, useEffect } from "react";
import { Text, View, Image } from 'react-native';
import { getOneEstate, getEstateCover, getEstatePictures } from '../../API/ApiEstates';
import { COVER_ESTATE_BASE_URL } from '@env';


const EstateDetail = ({route}) => {

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

    // console.log(COVER_ESTATE_BASE_URL + pictureCover.name);
    // const monImage = COVER_ESTATE_BASE_URL + pictureCover.name
    return (

        // !loading &&

            <View>
                <Text>detail estate</Text>
                <Text>{COVER_ESTATE_BASE_URL + pictureCover.name}</Text>
                <Image source={{ uri: COVER_ESTATE_BASE_URL + pictureCover.name }} style={{height:100, width:100}}/>
            </View>
    );
};


export default EstateDetail;