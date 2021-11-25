import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
// import styled from "styled-components";
// import colors from "../../utils/styles/colors";
import Loader from "../../Tools/Loader/Loader";
// import {Context} from "../../utils/context/Context";
import { Button, StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native'
import Card from '../../components/Customer/Card';
import Topbar from './../Topbar/Topbar';


const CustomerDetail = () => {
    const [customerData, setCustomerData] = useState({});
    const [customerSearch, setCustomerSearch] =  useState({});
    const [customerType, setCustomerType] =  useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [loading, setLoading] = useState(true);
  
   
   
    useEffect(() => {

        // Test de la validité du token

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

              axios.get(
                  "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customer_type/2" 
              )
                  .then((res) => {
                    setCustomerType(res.data);
                      console.log(res.data)
                  })
                  .catch((error) => {
                      console.log(error.message);
                  })
                  .finally(() => {
                      setLoading(false);
                  });
  
        axios.get(
                "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/describe_customer_type/joinCustomer/3"
            )
            .then((res) => {
                setCustomerTypeData(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);
    return (
      

      
      <View  style={styles.main_container}>
        <Topbar/>
        
       
       <View  style={styles.main_container}> 
       <Text style={styles.titleTextPrincipal}>Détails client</Text>
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
                    <Text style={styles.innerText}> {customerData.firstname}</Text>
                </Text>
                <Text style={styles.baseText}>
                        Mail :
                    <Text style={styles.innerText}> {customerData.mail}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Date de naissance :
                    <Text style={styles.innerText}> {customerData.birthdate}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Adresse: 
                    <Text style={styles.innerText}> {customerData.address}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Numéro client :
                    <Text style={styles.innerText}> {customerData.n_customer}</Text>
                </Text><Text style={styles.baseText}>
                    Type client :
                    <Text style={styles.innerText}> {customerType.customer_type}</Text>
                </Text>


                    <View  style={styles.titleContainer}>
                    <Text style={styles.titleText}>Recherche du client</Text>
                    </View>
                <Text style={styles.baseText}>
                        Achat/Location : 
                <Text style={styles.innerText}> {customerSearch.buy_or_rent}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Surface min :
                    <Text style={styles.innerText}> {customerSearch.surface_min} m²</Text>
                </Text>
                <Text style={styles.baseText}>
                    Budget maxi :  
                    <Text style={styles.innerText}> {customerSearch.budget_max}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Secteur de recherche (longitude/latitude):
                    <Text style={styles.innerText}> {customerSearch.search_longitude}/{customerSearch.search_latitude}</Text>
                </Text>
                <Text style={styles.baseText}>
                    Rayon de recherche :  
                    <Text style={styles.innerText}> {customerSearch.search_radius} Km</Text>
                </Text>
                </View>
            </View>
      </View>
      </View>
        
        
    );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1 , 


  backgroundColor: '#4EA1D5',
  borderRadius: 20
},
    main_container2: {
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
