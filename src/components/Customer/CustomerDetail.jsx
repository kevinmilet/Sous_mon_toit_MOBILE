import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
// import styled from "styled-components";
// import colors from "../../utils/styles/colors";
import Loader from "../../Tools/Loader/Loader";
// import {Context} from "../../utils/context/Context";
import { Button, StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native'
import Card from '../../components/Customer/Card';


const CustomerDetail = () => {
    const [customerData, setCustomerData] = useState({});
    const [CustomerSearch, setCustomerSearch] =  useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [loading, setLoading] = useState(true);
    const localStorage = [];
    localStorage["token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGktc291c21vbnRvaXQuYW0ubWFudXNpZW4tZWNvbGVsYW1hbnUuZnJcL3B1YmxpY1wvbG9naW5cL3N0YWZmIiwiaWF0IjoxNjM3NzQ4MTM2LCJleHAiOjE2Mzc3NTE3MzYsIm5iZiI6MTYzNzc0ODEzNiwianRpIjoiVlpveG11Nk1MdUdkMVZyQyIsInN1YiI6MiwicHJ2IjoiNjNjNmQwNjFmOGJkNGUzNTBmMjk4MDRmNThlNDMzNTRhNjZiNTg3NyJ9.kMpBgW7kBUKVKL1du_JU9N2OhoHyvgsjMPoxDjc13V0";
    axios.defaults.headers.common = {
        
       
        Authorization:  `Bearer ${localStorage["token"]}`,
    };

    useEffect(() => {

        // Test de la validité du token
        axios.interceptors.response.use(function (response) {
            return response
        }, function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.clear()
                    return window.location = '/connexion' // redirect to login page
                }
            }
        })

        axios.get(
            "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customer/s/2" 
        )
            .then((res) => {
                setCustomerData(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

            axios.get(
                "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customer_search/s/2" 
            )
                .then((res) => {
                    setCustomerSearch(res.data);
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });

        // axios.get(
        //         "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/describe_customer_type/joinCustomer/" + localStorage["userId"]
        //     )
        //     .then((res) => {
        //         setCustomerTypeData(res.data);
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });

    }, []);
    return (

        
        <View style={styles.main_container}  > 
            <View style={styles.content_container}>  
                <View >
                <View  style={styles.titleContainer}>
                    <Text style={styles.titleText}>Infos personnelles</Text>
                </View>
                <Text style={styles.baseText}>
                        Nom : 
                    <Text style={styles.innerText}> {customerData.lastname}</Text>
                </Text>
                <Text style={styles.baseText}>
                        Prénom : 
                    <Text style={styles.innerText}>{customerData.firstname}</Text>
                </Text>
                <Text style={styles.baseText}>
                        Mail :
                    <Text style={styles.innerText}> {customerData.mail}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Date de naissance :
                    <Text style={styles.innerText}>{customerData.birthdate}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Adresse: 
                    <Text style={styles.innerText}>{customerData.address}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Numéro client :
                    <Text style={styles.innerText}> {customerData.n_customer}</Text>
                </Text>
                    <View  style={styles.titleContainer}>
                    <Text style={styles.titleText}>Recherche du client</Text>
                    </View>
                </View>
            </View>
      </View>
        
        
    );
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1 , 
    
      margin: 10,
      padding: 10,
      backgroundColor: '#4EA1D5',
      borderRadius: 20
    },
    baseText: {
        fontWeight: 'bold'
      },
      innerText: {
        fontStyle: 'italic',
        fontWeight: 'normal'
    },
    titleContainer: {
        justifyContent: "center" ,
        alignItems:"center",
        borderWidth: 4,
        margin: 10,
    
        
    },
    titleText:{
        fontWeight: 'bold',
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    vote_text: {
      fontWeight: 'bold',
      fontSize: 26,
      color: '#666666'
    },
    description_container: {
      flex: 7
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container: {
      flex: 1
    },
    date_text: {
      textAlign: 'right',
      fontSize: 14
    }
  })
export default CustomerDetail;
