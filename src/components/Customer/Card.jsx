import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  getCustomerDescribe,
  getCustomerSearch,
  getOneCustomer,
} from "../../API/ApiCustomers";
const Card = ({customer}) => {
  
  const navigation = useNavigation();
    return (
      <TouchableOpacity style={styles.main_container} onPress={() => navigation.navigate('customerDetail', {id : customer.id})} > 
        <View style={styles.content_container}>  
          <View >
          <Text style={styles.baseText}>
              Nom :
              <Text style={styles.innerText}> {customer.lastname}</Text>
            </Text>
            <Text style={styles.baseText}>
              Prénom :
              <Text style={styles.innerText}> {customer.firstname}</Text>
            </Text>
            <Text style={styles.baseText}>
              Mail :<Text style={styles.innerText}> {customer.mail}</Text>
            </Text>
          
          </View>
        </View>
      </TouchableOpacity>
      )
      
  }
  
  const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      margin: 10,
      padding: 10,
      backgroundColor: '#4EA1D5',
      borderRadius: 20
    },
    baseText: {
    fontWeight: "bold",
    color: "#EAEAEA"
  },
  innerText: {
    fontStyle: "italic",
    fontWeight: "normal",
    color: "black"
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
  
  export default Card