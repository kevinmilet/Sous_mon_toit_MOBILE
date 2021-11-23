import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { default as React, default as React, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import SignIn from './src/components/connexion/SignIn';
import NavigationMain from './src/navigation/NavigationMain';
import ApiRoutes from "./src/utils/const/ApiRoutes";

export default function App() {

  const API_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/';
  const [tokenIsValid, setTokenIsValid] = useState(true);
  axios.defaults.headers.common = { 'Authorization': `Bearer ${AsyncStorage.getItem('@auth:token')}` }

  // Test de la validité du token
  useEffect(() => {
    console.log(AsyncStorage.getItem('@auth:token'))

    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          AsyncStorage.removeItem('@auth:token')
          setTokenIsValid(false)
        }
      }
      return Promise.reject(error);
    })
    axios.get(API_URL + ApiRoutes.customer + "/s/2")
  }, [API_URL]);

  return (
    tokenIsValid === true ?
    <SafeAreaView style={{flex: 1}}>
      <NavigationMain />
    </SafeAreaView>
      :
      <SignIn/>
  );
}

