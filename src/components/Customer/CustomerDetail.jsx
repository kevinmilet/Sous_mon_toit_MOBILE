import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { getCustomerSearch, getOneCustomer } from "../../API/ApiCustomers";


const CustomerDetail = () => {
    const [customerData, setCustomerData] = useState({});
    const [CustomerSearch, setCustomerSearch] =  useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        getOneCustomer('2').then((res) => {
                setCustomerData(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        getCustomerSearch('2').then((res) => {
                setCustomerSearch(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
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
});

export default CustomerDetail;
