import React from "react";
import {StyleSheet, Text, View } from 'react-native';
import colors from '../../utils/styles/colors';

const CustomeAptmt= (props) =>{
const {customer} = props

  return (
    <View style={styles.main_container}>
      <Text> {customer} </Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: colors.secondaryBtn,
    borderRadius: 20,
    borderWidth: 2,
  },


});


export default CustomeAptmt
