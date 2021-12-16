import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { getAllCustomers } from "../../API/ApiCustomers";
import Card from '../../components/Customer/Card';
import Loader from "../../Tools/Loader/Loader";
import Topbar from './../Topbar/Topbar';
import colors from '../../utils/styles/colors';
import { Searchbar } from 'react-native-paper';
import {searchCustomers} from "../../API/ApiCustomers";


const CustomerList = () => {
    const [customerData1, setCustomerData1] = useState({});
    const [loading, setLoading] = useState(true);
    const [estateInput, setEstateInput] = useState('');
    const [searchTimer, setSearchTimer] = useState(null);
    const [customerInput, setCustomerInput] = useState('');
    const [modalCVisible, setModalCVisible] = useState(false);
    const [modalEVisible, setModalEVisible] = useState(false);
    const [customerData2, setCustomerData2] = useState([]);

    useEffect(() => {
        getAllCustomers().then((res) => {
                setCustomerData1(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
             const onTimeChange = (e, selectedTime) => {
                setTime(moment(selectedTime));
                if (Platform.OS === 'android') {
                    setIsTimePickerShow(false);
                }
            };
        
             getCustomersResults = (text) => {
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
            }
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
        <FlatList
            data={customerData1}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <Card customer={item}/>}
        
        />
        </View>
    );
};
const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.primary
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CustomerList;
