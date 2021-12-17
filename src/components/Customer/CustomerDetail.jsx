import React, { useEffect, useState , useContext} from "react";
import { StyleSheet, Text, View, ScrollView , FlatList, SectionList, SafeAreaView} from "react-native";
import { getCustomerDescribe, getCustomerSearch } from "../../API/ApiCustomers";
import Topbar from "../Topbar/Topbar";
import { getAllCustomerAptmt } from "../../API/ApiApointements";
import Moment from "moment";
import "moment/locale/fr";
import Loader from "../../Tools/Loader/Loader";
import { useIsFocused } from "@react-navigation/native";
import CustomerAptmt from "../Customer/CustomerAptmt";
import colors from '../../utils/styles/colors';
import NotSearch from './NotSearch';
import CustomerSearch from "./CustomerSearch";
import LogContext from '../../API/Context/LogContext';

const CustomerDetail = ({ route }) => {
  const { id } = route.params;
  const isFocused = useIsFocused();

  const [customerData, setCustomerData] = useState({});
  const [customerSearch, setCustomerSearch] = useState(null);
  const [customerTypes, setCustomerTypes] = useState(null);
  const [customerTypeData, setCustomerTypeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [customerAptmts, setCustomerAptmts] = useState([]);
  const {setTokenIsValid} = useContext(LogContext);

  useEffect(() => {
    getCustomerSearch(id)
      .then((res) => {
        if(res.response){
            if(res.response.status === 401)
            setTokenIsValid(false)
        }
        if(Object.entries(res.data).length != 0){
          setCustomerSearch(res.data);
        }

        console.log(res.data.length, "search");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    getCustomerDescribe(id)
      .then((res) => {
        setCustomerData(res.data[0][0]);
        console.log(res.data, "describe5");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
      
      getAllCustomerAptmt(id)
     .then((res) => {
      
        let allApptmt = [];
        res.data.map( item=>{
          
          
  
            Moment.locale();
            var dt = item.scheduled_at;
            const formatDate = Moment(dt).format("LLLL")
          
            allApptmt = [...allApptmt, formatDate];
          
         
        });


         setCustomerAptmts(allApptmt);
        
        
      }).finally(() => {
        // let formatHour = null;
       
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      })
     
  }, [id, isFocused]);
  console.log( customerAptmts, 'ff');
  console.log(customerSearch, 'eeeeee');
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.main_container}>
      <Topbar />
 
      <ScrollView style={styles.main_container2}>            
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
                <Text style={styles.innerText}>
                  {" "}
                  {customerData?.customer_type}
                </Text>
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
              : <NotSearch/>
              } 
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Rendez-vous</Text>
              </View>
              {/* <Text style={styles.baseText}>
                Rendez-vous :
                </Text> */}
                {/* <Text style={styles.innerText}>
                  {" "}
                  {formatHour}
                {customerTypes ?   customerTypes : null } 
              </Text> */}

              {/* <FlatList
                data={customerAptmts}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => <CustomerAptmt customer={item} />}
              /> */}
              {/* </Text>  */}
              {customerAptmts.length == 0 ?(
                <Text> Pas de RDV pour ce client</Text>
              )
            :
            (
              <FlatList
              horizontal={true}

              data={customerAptmts}
              keyExtractor={(item, index) => index}
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
    // backgroundColor: "#4EA1D5",
  },

  styleTitleMain: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#E85A70",
  },
  main_container2: {
    margin: 5,
    padding: 10,
    backgroundColor:'#4EA1D5',
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
    // margin: 5,

    marginBottom: 30,
  },
  containerTitleMain: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default CustomerDetail;
