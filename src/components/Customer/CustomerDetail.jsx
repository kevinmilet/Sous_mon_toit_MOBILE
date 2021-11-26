import Moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  getAllCustomerAptmts
} from "../../API/ApiApointements";
import {
  getCustomerDescribe,
  getCustomerSearch
} from "../../API/ApiCustomers";
import Topbar from "../Topbar/Topbar";
import colors from '../../utils/styles/colors'

const CustomerDetail = ({route}) => {
  const {id} =  route.params;

  const [customerData, setCustomerData] = useState({});
  const [customerSearch, setCustomerSearch] = useState({});
  const [loading, setLoading] = useState(true);
  const [customerAptmts, setCustomerAptmts ] = useState({});

  useEffect(() => {
    getCustomerSearch(id)
      .then((res) => {
        setCustomerSearch(res.data);
        console.log(res.data, "search");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    getCustomerDescribe(id)
      .then((res) => {
    
        setCustomerData(res.data[[0]][[0]]);
        console.log(res.data, "describe5");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
      getAllCustomerAptmts(id).then((res) => {
    
        setCustomerAptmts(res.data[0]);
      
        console.log(res.data,customerAptmts.scheduled_at, "appt5");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        // let formatHour = null;
        setLoading(false);
      });
    
  }, [id]);
  // if(customerAptmts.scheduled_at !== null){
    Moment.locale();
    const formatDate =  Moment(customerAptmts.scheduled_at).format('LLLL');
  
  
  
  return (
    <View style={styles.main_container}>
      <Topbar />
  
      <ScrollView style={styles.main_container2}>
        <View style={styles.containerTitleMain}>
          <Text style={styles.styleTitleMain}>Détails client</Text>
        </View>

        <View style={styles.content_container}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Infos personnelles</Text>
            </View>
            <Text style={styles.baseText}>
              Nom :
              <Text style={styles.innerText}> {customerData.lastname}</Text>
            </Text>
            <Text style={styles.baseText}>
              Prénom :
              <Text style={styles.innerText}> {customerData.firstname}</Text>
            </Text>
            <Text style={styles.baseText}>
              Mail :<Text style={styles.innerText}> {customerData.mail}</Text>
            </Text>
            <Text style={styles.baseText}>
              Date de naissance :
              <Text style={styles.innerText}> {customerData.birthdate}</Text>
            </Text>
            <Text style={styles.baseText}>
              Adresse :
              <Text style={styles.innerText}> {customerData.address}</Text>
            </Text>
            <Text style={styles.baseText}>
              Numéro client :
              <Text style={styles.innerText}> {customerData.n_customer}</Text>
            </Text>
            <Text style={styles.baseText}>
              Type client :
              <Text style={styles.innerText}>
                {" "}
                {customerData.customer_type}
              </Text>
            </Text>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Recherche du client</Text>
            </View>
            <Text style={styles.baseText}>
              Achat/Location :
              <Text style={styles.innerText}>
                {" "}
                {customerSearch.buy_or_rent}
              </Text>
            </Text>
            <Text style={styles.baseText}>
              Surface min :
              <Text style={styles.innerText}>
                {" "}
                {customerSearch.surface_min} m²
              </Text>
            </Text>
            <Text style={styles.baseText}>
              Budget maxi :
              <Text style={styles.innerText}> {customerSearch.budget_max}</Text>
            </Text>
            <Text style={styles.baseText}>
              Secteur de recherche (longitude/latitude) :
              <Text style={styles.innerText}>
                {" "}
                {customerSearch.search_longitude}/
                {customerSearch.search_latitude}
              </Text>
            </Text>
            <Text style={styles.baseText}>
              Rayon de recherche :
              <Text style={styles.innerText}>
                {" "}
                {customerSearch.search_radius} Km
              </Text>
            </Text>
            <Text style={styles.baseText}>
              Rendez-vous :
              <Text style={styles.innerText}>
                {" "}
                {customerAptmts ? customerAptmts.scheduled_at : null } 
              </Text>
            </Text>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Rendez-vous</Text>
            </View>
            <Text style={styles.baseText}>
              Rendez-vous :
          
              <Text style={styles.innerText}>
                {" "}
                {/* {formatHour} */}
              {formatDate ?   formatDate : null } 
              </Text>
              
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  styleTitleMain:{
    fontSize : 25,
    fontWeight: "bold",
    color: colors.primary
  },
  main_container2: {
    margin: 10,
    padding: 20,
    backgroundColor: colors.secondaryBtn,
    borderRadius: 10,
  },
  baseText: {
    fontWeight: "bold",
    color: colors.backgroundSecondary
  },
  innerText: {
    fontStyle: "italic",
    fontWeight: "normal",
    color: "black"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    margin: 10,
  },
  titleText: {
    fontWeight: "bold",
  },
  content_container: {
    flex: 1,
    marginBottom: 30
  },
  containerTitleMain: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default CustomerDetail;
