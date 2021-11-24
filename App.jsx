import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { default as React, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import SignIn from './src/components/connexion/SignIn';
import NavigationMain from './src/navigation/NavigationMain';
import ApiRoutes from "./src/utils/const/ApiRoutes";
import { StatusBar } from 'react-native';

export default function App() {

  const API_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/';
  const [tokenIsValid, setTokenIsValid] = useState(false);
  axios.defaults.headers.common = { 'Authorization': `Bearer ${AsyncStorage.getItem('@auth:token')}` }

  // Test de la validité du token
  // useEffect(() => {

  //   if (AsyncStorage.getItem('@auth:token') !== null ) {
  //     axios.interceptors.response.use(function (response) {
  //       setTokenIsValid(true);
  //       return response
  //     }, function (error) {
  //       if (error.response) {
  //         if (error.response.status === 401) {
  //           AsyncStorage.removeItem('@auth:token')
  //           console.log("supprimer token")
  //         }
  //       }
  //       return Promise.reject(error);
  //     })
  //     axios.get(API_URL + ApiRoutes.customer + "/s/2")
  //   }

  // }, [API_URL, tokenIsValid]);

  return (
    // tokenIsValid === true ?
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
        animated={true}
        backgroundColor="#61dafb" />
        <NavigationMain />
      </SafeAreaView>
      // :
      // <SignIn />
  );
}

