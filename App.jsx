import AsyncStorage from '@react-native-async-storage/async-storage';
import { default as React, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SignIn from './src/components/connexion/SignIn';
import NavigationMain from './src/navigation/NavigationMain';
import colors from './src/utils/styles/colors';

export default function App() {

  const [tokenIsValid, setTokenIsValid] = useState(false);
  // AsyncStorage.removeItem("@auth_token");
  // AsyncStorage.removeItem("@auth_userId");
  //Fonction de récupération du token dans le storage
  const readData = async () => {
    try {
        const value = await AsyncStorage.getItem('@auth_token')
        if (value !== null) {
            console.log('j\'ai un token !', value)
            return true;
        }else{
            console.log('pas de token')
            return false;
        }
    } catch (e) {
        console.log('Failed to fetch the data from storage')
    }
  }  
  useEffect(() => {

    readData().then(res=>{
      if(res){
        setTokenIsValid(true);
      }
    })

  }, [tokenIsValid]);

  return (
    tokenIsValid === true ?
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
        animated={true}
        backgroundColor={colors.primary} />
        <NavigationMain />
      </SafeAreaView>
      :
      <SignIn setTokenIsValid={setTokenIsValid}/>
  );
}

