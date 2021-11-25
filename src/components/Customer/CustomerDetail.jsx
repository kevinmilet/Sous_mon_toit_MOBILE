import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";
import {
  getCustomerDescribe,
  getCustomerSearch
} from "../../API/ApiCustomers";
import Topbar from "../Topbar/Topbar";
import {
  getAllCustomerAptmts
} from "../../API/ApiApointements";

const CustomerDetail = ({route}) => {
  const {id} =  route.params;

  const [customerData, setCustomerData] = useState({});
  const [customerSearch, setCustomerSearch] = useState({});
  const [customerTypes, setCustomerTypes] = useState({});
  const [customerTypeData, setCustomerTypeData] = useState({});
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
        console.log(res.data, "describe5");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
     
  }, [id]);
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
                {customerAptmts.scheduled_at} 
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
     backgroundColor: "#454552",
  },

  styleTitleMain:{
    fontSize : 25,
    fontWeight: "bold",
    color: "#E85A70"
  },

  main_container2: {
    // marginHorizontal: 20,
    // marginVertical: 10,
    margin: 10,
    padding: 20,
    backgroundColor: "#4EA1D5",
    borderRadius: 10,
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
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    margin: 10,
  },
  titleText: {
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content_container: {
    flex: 1,
    // margin: 5,

    marginBottom: 30
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  containerTitleMain: {
    justifyContent: "center",
    alignItems: "center",
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});

export default CustomerDetail;
