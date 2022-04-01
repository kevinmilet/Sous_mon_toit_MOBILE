import React, {useContext, useEffect, useState} from "react";
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {getCustomerDescribe, getCustomerSearch, getOneCustomer} from "../../API/ApiCustomers";
import Topbar from "../Topbar/Topbar";
import {getAllCustomerAptmt} from "../../API/ApiApointements";
import Moment from "moment";
import "moment/locale/fr";
import Loader from "../../Tools/Loader/Loader";
import {useIsFocused} from "@react-navigation/native";
import CustomerAptmt from "../Customer/CustomerAptmt";
import NotSearch from './NotSearch';
import LogContext from '../../API/Context/LogContext';

const CustomerDetail = ({ route }) => {
  const { id } = route.params;
  const isFocused = useIsFocused();

  const [customerData, setCustomerData] = useState({});
  const [customerSearch, setCustomerSearch] = useState(null);
  const [customerTypes, setCustomerTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerAptmts, setCustomerAptmts] = useState([]);
  const { setTokenIsValid } = useContext(LogContext);

  useEffect(() => {
    getCustomerSearch(id)
      .then((res) => {
        if (res.response) {
          if (res.response.status === 401)
            setTokenIsValid(false)
        }
        if (Object.entries(res.data).length !== 0) {
          setCustomerSearch(res.data);
        }
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    getOneCustomer(id)
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {

        setLoading(false);
      });

    getCustomerDescribe(id)
      .then((res) => {
        setCustomerTypes(res.data[0][0]);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {

        setLoading(false);
      });
    getAllCustomerAptmt(id)
      .then((res) => {

        let allApptmt = [];
        res.data.map(item => {

          Moment.locale();
          let dt = item.scheduled_at;
          const formatDate = Moment(dt).format("LLLL")

          allApptmt = [...allApptmt, formatDate];
        });

        setCustomerAptmts(allApptmt);
      }).finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      })

  }, [id, isFocused]);

  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.main_container}>
      <Topbar />

      <ScrollView style={styles.main_container2}>
        <Text style={styles.baseText}>
          Nom :
          <Text style={styles.innerText}> {customerData?.lastname}</Text>
        </Text>
        <Text style={styles.baseText}>
          Prénom :
          <Text style={styles.innerText}> {customerData?.firstname}</Text>
        </Text>
        <Text style={styles.baseText}>
          Mail :<Text style={styles.innerText}> {customerData?.mail}</Text>
        </Text>
        <Text style={styles.baseText}>
          Date de naissance :
          <Text style={styles.innerText}> {customerData?.birthdate}</Text>
        </Text>
        <Text style={styles.baseText}>
          Adresse :
          <Text style={styles.innerText}> {customerData?.address}</Text>
        </Text>
        <Text style={styles.baseText}>
          Numéro client :
          <Text style={styles.innerText}> {customerData?.n_customer}</Text>
        </Text>
        <Text style={styles.baseText}>
          Type client :
          {(customerTypes) ? <Text style={styles.innerText}>
            {" "}

            {customerTypes?.customer_type}
          </Text>
            :
            <Text style={styles.innerText}>
              {" Non renseigné"}
            </Text>
          }
        </Text>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Recherche du client</Text>
        </View>
        {customerSearch != null ? (

          <View>
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
          </View>
        )
          : <NotSearch />
        }
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Rendez-vous</Text>
        </View>

        {customerAptmts.length === 0 ? (
          <Text> Pas de RDV pour ce client</Text>
        )
          :
          (
            <FlatList
              horizontal={true}

              data={customerAptmts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CustomerAptmt customer={item} />}
              renderSectionHeader={({ section: { title } }) => (
                <Text > rdv</Text>
              )}
            />
          )
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

  styleTitleMain: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#E85A70",
  },
  main_container2: {
    margin: 5,
    padding: 10,
    backgroundColor: '#4EA1D5',
    borderRadius: 10
  },
  baseText: {
    fontWeight: "bold",
    color: "#EAEAEA",
  },
  innerText: {
    fontStyle: "italic",
    fontWeight: "normal",
    color: "black",
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
    marginBottom: 30,
  },
  containerTitleMain: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default CustomerDetail;
