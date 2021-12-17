import React, { useEffect, useState, useContext} from "react";
import { FlatList, StyleSheet, View, TextInput, Modal, Pressable, Text, TouchableOpacity, Button} from 'react-native';
import { getAllCustomers } from "../../API/ApiCustomers";
import Card from '../../components/Customer/Card';
import Loader from "../../Tools/Loader/Loader";
import Topbar from './../Topbar/Topbar';
import colors from '../../utils/styles/colors';
import { Searchbar } from 'react-native-paper';
import {searchCustomers} from "../../API/ApiCustomers";
import { useNavigation } from '@react-navigation/native';
import LogContext from '../../API/Context/LogContext';


const CustomerList = () => {
    const [customerData1, setCustomerData1] = useState({});
    const [loading, setLoading] = useState(true);
    const [estateInput, setEstateInput] = useState('');
    const [searchTimer, setSearchTimer] = useState(null);
    const [customerInput, setCustomerInput] = useState('');
    const [modalCVisible, setModalCVisible] = useState(false);
    const [modalEVisible, setModalEVisible] = useState(false);
    const [customerData2, setCustomerData2] = useState([]);
    const [customer, setCustomer] = useState('');
    const navigation = useNavigation();
    const selectCustomer = (customerIT) => {
        setCustomer(customerIT);
        setModalCVisible(false)
        setCustomerData2(null);
        setCustomerInput(null);
    }
    const {setTokenIsValid} = useContext(LogContext);
    const onTimeChange = (e, selectedTime) => {
        setTime(moment(selectedTime));
        if (Platform.OS === 'android') {
            setIsTimePickerShow(false);
        }
    };
    const  getCustomersResults = (text) => {
        if(!text){
            alert('cc')
            getAllCustomers();
        }
       searchCustomers(text).then(
           response => {
               setCustomerData2(response.data);
           }
       ).finally(() => {
           setModalCVisible(true)
           }
       ).catch(error => {
           console.log(error.message);
       })
   };

   const  onPress1 = () => {
    setCustomer(null);
}
    useEffect(() => {
        getAllCustomers().then((res) => {
                if(res.response){
                    if(res.response.status === 401)
                    setTokenIsValid(false)
                }
                setCustomerData1(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
          
        
             
           
          
    }, []);

    if (loading) {
        return <Loader/>;
    }
    return (
        
        <View style={styles.mainContainer}>
            <Topbar/>
            <Searchbar style={styles.dropdownInput}
                                placeholder="Chercher un client"
                               onChangeText={(text) => {
                                   if (searchTimer) {
                                       clearTimeout(searchTimer);
                                   }
                                   setCustomerInput(text);
                                   setSearchTimer(
                                       setTimeout(() => {
                                           if (text.length >= 3) {
                                               getCustomersResults(text);
                                           }
                                       }, 200),
                                   );
                               }}
                               value={customerInput} />
                               
                    <Modal animationType="slide"
                            transparent={true}
                            visible={modalCVisible}
                            onRequestClose={() => {
                               setCustomerData(null);
                               setSearchTimer(null);
                               setModalCVisible(false);
                            }}
                            >
                        <View style={styles.centeredModal}>
                            <View style={styles.modalView}>
                                <FlatList
                                          data={customerData2}
                                          renderItem={({ item }) => (
                                              <View>
                                                  <TouchableOpacity onPress={() => selectCustomer(item)}>
                                                        <Text style={styles.modalText}>{item.firstname} {item.lastname}</Text>
                                                  </TouchableOpacity>
                                              </View>
                                          )}
                                          keyExtractor={(item) => "" + item.id}
                                />
                            </View>
                            <Pressable
                                style={[styles.modalButton, styles.buttonClose]}
                                onPress={() => setModalCVisible(false)}
                            >
                                <Text style={styles.btnText}>Fermer</Text>
                            </Pressable>
                        </View>
                    </Modal>
                    {!customer  ?(
                        <FlatList
                        data={customerData1}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <Card customer={item}/>}

                        />
                      
                      
                     
                    ):( 
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('customerDetail', {id : customer.id})} > 
                        <View style={styles.content_container}>  
                          <View >
                          <Text style={styles.baseText}>
                              Nom :
                              <Text style={styles.innerText}> {customer.lastname}</Text>
                            </Text>
                            <Text style={styles.baseText}>
                              Prénom :
                              <Text style={styles.innerText}> {customer.firstname}</Text>
                            </Text>
                            <Text style={styles.baseText}>
                              Mail :<Text style={styles.innerText}> {customer.mail}</Text>
                            </Text>
                          
                          </View>
                        </View>
                      </TouchableOpacity>
                        
                    //     <View>
                    //     <TextInput editable={false}>{customer.firstname} {customer.lastname}</TextInput>
                    //    </View>
                    )
                }
                   
                   <Button title="Tout les clients" onPress={onPress1} /> 
        </View>
    );
};
const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.primary
    },
    baseText: {
        fontWeight: "bold",
        color: colors.backgroundSecondary
      },
      innerText: {
        fontStyle: "italic",
        fontWeight: "normal",
        color: colors.primary
      },
    card: {
     
        margin: 10,
        padding: 10,
        backgroundColor: colors.secondaryBtn,
        borderRadius: 20
      },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    datetime_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInput: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: colors.secondaryBtn,
        borderRadius: 25,
        borderWidth: 1,
        width: 200,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        fontSize: 18,
        backgroundColor: colors.backgroundPrimary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    timeInput: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: colors.secondaryBtn,
        borderRadius: 25,
        borderWidth: 1,
        width: 100,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        fontSize: 18,
        backgroundColor: colors.backgroundPrimary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textareaInput: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: colors.secondaryBtn,
        borderRadius: 25,
        borderWidth: 1,
        width: '100%',
        marginVertical: 5,
        fontSize: 18,
        backgroundColor: colors.backgroundPrimary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    // Seulement pour iOS
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    dropdown : {
        borderRadius: 25
    },
    dropdownInput : {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: colors.secondaryBtn,
        borderRadius: 25,
        borderWidth: 1,
        width: '100%',
        marginVertical: 5,
        height: 55,
        fontSize: 18,
        backgroundColor: colors.backgroundPrimary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    selectBtnText: {
        color: colors.primary,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'normal'
    },
    button: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: colors.primaryBtn,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        height: 55,
        width: 245,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btnText: {
        color: colors.backgroundPrimary,
        textAlign: 'center',
        fontSize: 18,
    },
    centeredModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        width: '50%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        elevation: 2,
        padding: 10,
        borderRadius: 25,
        backgroundColor: colors.secondaryBtn,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        height: 50,
        width: 150,
    },
    modalText: {
        // marginBottom: 20,
        // textAlign: "left",
        // fontSize: 18,
    }
})

export default CustomerList;
