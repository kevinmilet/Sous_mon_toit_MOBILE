import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../utils/styles/colors';


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
      backgroundColor: colors.secondaryBtn,
      borderRadius: 20
    },
    baseText: {
      fontWeight: "bold",
      color: colors.backgroundSecondary
    },
    innerText: {
      fontStyle: "italic",
      fontWeight: "normal",
      color: colors.primary
    },
    content_container: {
      flex: 1,
      margin: 5
    }
  })
  
  export default Card