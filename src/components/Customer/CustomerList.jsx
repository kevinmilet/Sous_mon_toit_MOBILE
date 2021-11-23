import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
// import styled from "styled-components";
// import colors from "../../utils/styles/colors";
import Loader from "../../Tools/Loader/Loader";
// import {Context} from "../../utils/context/Context";
import { Button, StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native'
import Card from '../../components/Customer/Card';


const CustomerList = () => {
    const [customerData, setCustomerData] = useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [loading, setLoading] = useState(true);
    const localStorage = [];
    localStorage["token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGktc291c21vbnRvaXQuYW0ubWFudXNpZW4tZWNvbGVsYW1hbnUuZnJcL3B1YmxpY1wvbG9naW5cL3N0YWZmIiwiaWF0IjoxNjM3Njc1NjY5LCJleHAiOjE2Mzc2NzkyNjksIm5iZiI6MTYzNzY3NTY2OSwianRpIjoibVFZcWZWRWprMjN0U3lZNCIsInN1YiI6MiwicHJ2IjoiNjNjNmQwNjFmOGJkNGUzNTBmMjk4MDRmNThlNDMzNTRhNjZiNTg3NyJ9.FeA1JZGgrpmIwCLhty387OQvz6BBQ_MPSXez0Z6-Lvg";
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
            "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customer/s/" 
        )
            .then((res) => {
                setCustomerData(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        axios
            .get(
                "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/describe_customer_type/joinCustomer/" + localStorage["userId"]
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

    if (loading) {
        return <Loader/>;
    }
    return (
        <View style={styles.mainContainer}>
    
        <FlatList
            data={customerData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <Card customer={item}/>}
           
        />
     </View>
    );
};
const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50
    },
    textinput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CustomerList;
