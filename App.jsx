import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { default as React, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SignIn from './src/components/connexion/SignIn';
import NavigationMain from './src/navigation/NavigationMain';

export default function App() {

  const [tokenIsValid, setTokenIsValid] = useState(false);
  //Fonction de récupération du token dans le storage
  const readData = async () => {
    try {
        const value = await AsyncStorage.getItem('@auth:token')
        console.log(value);
        if (value !== null) {
            console.log('TOKEN = ' + value);
            return value;
        }else{
            alert('pas de token')
        }
    } catch (e) {
        console.log('Failed to fetch the data from storage')
    }
  }  
  useEffect(() => {
      readData().then(res=>{
        // Enregistrement du token dans le header
        axios.defaults.headers.common['Authorization'] = `Bearer ${res}`
        // Test de la validité du token
        axios.interceptors.response.use(function (response) {
          setTokenIsValid(true);
          return response
        }, function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              AsyncStorage.removeItem('@auth:token')
              alert('j\ai supprimé le token')
            }
          }
          return Promise.reject(error);
        })
      });
  }, [API_URL, tokenIsValid]);

  return (
    tokenIsValid === true ?
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
        animated={true}
        backgroundColor="#61dafb" />
        <NavigationMain />
      </SafeAreaView>
      :
      <SignIn />
  );
}

