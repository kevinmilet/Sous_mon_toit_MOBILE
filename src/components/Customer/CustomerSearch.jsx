import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {getCustomerDescribe, getCustomerSearch} from "../../API/ApiCustomers";
import {getAllCustomerAptmts} from "../../API/ApiApointements";
import Moment from "moment";
import "moment/locale/fr";
import Loader from "../../Tools/Loader/Loader";
import {useIsFocused} from "@react-navigation/native";

const CustomerSearch = ({route}) => {
    const {id} = route.params;
    const isFocused = useIsFocused();

    const [customerData, setCustomerData] = useState({});
    const [customerSearch, setCustomerSearch] = useState({});
    const [loading, setLoading] = useState(true);
    const [customerAptmts, setCustomerAptmts] = useState([]);

    useEffect(() => {
        getCustomerSearch(id)
            .then((res) => {
                setCustomerSearch(res.data);
            })
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        getCustomerDescribe(id)
            .then((res) => {
                setCustomerData(res.data[0][0]);
            })
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        getAllCustomerAptmts(id)
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
        return <Loader/>;
    }

    return (
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

export default CustomerSearch;
