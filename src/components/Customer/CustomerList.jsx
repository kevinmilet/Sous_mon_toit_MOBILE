import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { getAllCustomers } from "../../API/ApiCustomers";
import Card from '../../components/Customer/Card';
import Loader from "../../Tools/Loader/Loader";
import Topbar from './../Topbar/Topbar';


const CustomerList = () => {
    const [customerData, setCustomerData] = useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCustomers().then((res) => {
                setCustomerData(res.data);
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
        <FlatList
            data={customerData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <Card customer={item}/>}
        
        />
        </View>
    );
};
const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
         backgroundColor: "#454552"
    },
    textinput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CustomerList;
