import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../utils/styles/colors';


const NotSearch = () => {
  
  const navigation = useNavigation();
    return (
        <Text> Pas de recherche pour ce client</Text>
    )
    }
  export default NotSearch; 