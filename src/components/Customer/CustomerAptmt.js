import React from "react";
import {Text } from 'react-native';

const CustomeAptmt= (props) =>{
console.log(props)
const {customer} = props

  return (

    <Text> {customer} </Text>
  )
}

export default CustomeAptmt