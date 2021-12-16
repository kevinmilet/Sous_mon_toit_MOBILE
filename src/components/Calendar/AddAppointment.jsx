import React, {useEffect, useState} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    Modal,
    Pressable
} from "react-native";
import moment from 'moment';
import 'moment/locale/fr';
import Topbar from "../Topbar/Topbar";
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import colors from "../../utils/styles/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getAptmtsTypes} from "../../API/ApiApointements";
import { Searchbar } from 'react-native-paper';
import {searchCustomers} from "../../API/ApiCustomers";
import {searchEstates} from "../../API/ApiEstates";

const AddAppointment = () => {

    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());
    const [note, setNote] = useState();

    const [isDatePickerShow, setIsDatePickerShow] = useState(false);
    const [isTimePickerShow, setIsTimePickerShow] = useState(false);

    const [customerInput, setCustomerInput] = useState('');
    const [customerData, setCustomerData] = useState([]);
    const [customer, setCustomer] = useState('');

    const [estate, setEstate] = useState('');
    const [estateInput, setEstateInput] = useState('');
    const [estateData, setEstateData] = useState([]);

    const [searchTimer, setSearchTimer] = useState(null);
    const [aptmtsTypes, setAptmtsTypes] = useState({
        appointment_type: '',
        id: null
    });
    const [modalCVisible, setModalCVisible] = useState(false);
    const [modalEVisible, setModalEVisible] = useState(false);

    const showDatePicker = () => {
        setIsDatePickerShow(true);
    }

    const showTimePicker = () => {
        setIsTimePickerShow(true);
    }

    const onDateChange = (e, selectedDate) => {
        setDate(moment(selectedDate));
        if (Platform.OS === 'android') {
            setIsDatePickerShow(false);
        }
    }

    const onTimeChange = (e, selectedTime) => {
        setTime(moment(selectedTime));
        if (Platform.OS === 'android') {
            setIsTimePickerShow(false);
        }
    }

    const getCustomersResults = (text) => {
        searchCustomers(text).then(
            response => {
                setCustomerData(response.data);
            }
        ).finally(() => {
            setModalCVisible(true)
            }
        ).catch(error => {
            console.log(error.message);
        })
    }

    const getEstatesResults = (text) => {
        searchEstates(text).then(
            response => {
                setEstateData(response.data);
            }
        ).finally(() => {
            setModalEVisible(true)
            }
        ).catch(error => {
            console.log(error.message);
        })
    }

    const selectCustomer = (customerIT) => {
        setCustomer(customerIT);
        setModalCVisible(false)
        setCustomerData(null);
        setCustomerInput(null);
    }

    const selectEstates = (estateIT) => {
        setEstate(estateIT);
        setModalEVisible(false)
        setEstateData(null);
        setEstateInput(null);
    }

    useEffect(() => {
        getAptmtsTypes().then(
            response => {
                setAptmtsTypes(response.data);
            }
        ).catch (error => {
            console.log(error.message)
        });
    }, []);

    return (
        <>
            <View>
                <Topbar />
            </View>

            <ScrollView style={styles.main_container}>

                <View>
                    <Text style={styles.title}>Ajouter un rendez-vous</Text>
                </View>

                <View style={styles.datetime_container}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0}
                            onPress={showDatePicker}
                            style={styles.dateInput}>
                            <View>
                                <Text>{date.format('LL')}</Text>
                            </View>
                        </TouchableOpacity>

                        {isDatePickerShow && (
                            <DateTimePicker
                                value={new Date(date.format('YYYY-MM-DD'))}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24hour={true}
                                onChange={onDateChange}
                                style={styles.datePicker}
                            />
                        )}
                    </View>

                    <View>
                        <TouchableOpacity
                            activeOpacity={0}
                            onPress={showTimePicker}
                            style={styles.timeInput}>
                            <View>
                                <Text>{time.format('LT')}</Text>
                            </View>
                        </TouchableOpacity>

                        {isTimePickerShow && (
                            <DateTimePicker
                                value={new Date(time)}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24hour={true}
                                onChange={onTimeChange}
                                style={styles.datePicker}
                            />
                        )}
                    </View>
                </View>

                <View>
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
                                          data={customerData}
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

                    <View>
                        <TextInput editable={false}>{customer.firstname} {customer.lastname}</TextInput>
                    </View>

                </View>

                <View>
                    <Searchbar style={styles.dropdownInput}
                               placeholder="Chercher un bien"
                               onChangeText={(text) => {
                                   if (searchTimer) {
                                       clearTimeout(searchTimer);
                                   }
                                   setEstateInput(text);
                                   setSearchTimer(
                                       setTimeout(() => {
                                           if (text.length >= 3) {
                                               getEstatesResults(text);
                                           }
                                       }, 200),
                                   );
                               }}
                               value={estateInput} />

                    <Modal animationType="slide"
                           transparent={true}
                           visible={modalEVisible}
                           onRequestClose={() => {
                               setEstateData(null);
                               setSearchTimer(null);
                               setModalEVisible(false);
                           }}
                    >
                        <View style={styles.centeredModal}>
                            <View style={styles.modalView}>
                                <FlatList
                                    data={estateData}
                                    renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity onPress={() => selectEstates(item)}>
                                                <Text style={styles.modalText}>{item.city } / {item.title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item) => "" + item.id}
                                />
                            </View>
                            <Pressable
                                style={[styles.modalButton, styles.buttonClose]}
                                onPress={() => setModalEVisible(false)}
                            >
                                <Text style={styles.btnText}>Fermer</Text>
                            </Pressable>
                        </View>
                    </Modal>

                    <View>
                        <TextInput editable={false}>{estate.reference} - {estate.title} - {estate.city}</TextInput>
                    </View>

                </View>

                <View>
                    <SelectDropdown
                        data={aptmtsTypes}
                        defaultButtonText={"Type"}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.appointment_type
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.appointment_type
                        }}
                        buttonStyle={styles.dropdownInput}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                        buttonTextStyle={styles.selectBtnText}
                        renderDropdownIcon={() => {
                            return <MaterialCommunityIcons name="chevron-down" size={18} color={colors.secondaryBtn} />;
                        }}
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.textareaInput}
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Ajouter une note au rendez-vous"
                        value={note}
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    title: {
        justifyContent: 'center',
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
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
        marginTop: 22
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
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
        marginBottom: 20,
        textAlign: "left",
        fontSize: 18,
    }
})

export default AddAppointment;
