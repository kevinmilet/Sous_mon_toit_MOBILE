import React, {forwardRef, useEffect, useState} from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import moment from 'moment';
import 'moment/locale/fr';
import Topbar from "../Topbar/Topbar";
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import colors from "../../utils/styles/colors";
import {Entypo as Icon, MaterialCommunityIcons} from '@expo/vector-icons';
import {getAptmtsTypes, updateAptmt} from "../../API/ApiApointements";
import {Searchbar} from 'react-native-paper';
import {searchEstates} from "../../API/ApiEstates";
import {getCurrentUser, getStaffList} from "../../API/ApiStaff";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

const EditAppointment = ({route}) => {
    const { Appointment } = route.params;
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [date, setDate] = useState(Appointment.scheduled_at);
    const [time, setTime] = useState(Appointment.scheduled_at);
    const [isDatePickerShow, setIsDatePickerShow] = useState(false);
    const [isTimePickerShow, setIsTimePickerShow] = useState(false);
    const [estate, setEstate] = useState('');
    const [estateInput, setEstateInput] = useState('');
    const [estateData, setEstateData] = useState([]);
    const [searchTimer, setSearchTimer] = useState(null);
    const [aptmtsTypes, setAptmtsTypes] = useState({
        appointment_type: '',
        id: null
    });
    const [typeAppt , setTypeAppt] = useState('');
    const [staffList, setStaffList] = useState();
    const [staff, setStaff] = useState();
    const [modalEVisible, setModalEVisible] = useState(false);

    useEffect(() => {
        getStaffList().then(
            response => {
                setStaffList(response.data)
            }
        ).catch(error => {
            console.error(error.message)
        }).finally(() => {
            getAptmtsTypes().then(
                response => {
                    setAptmtsTypes(response.data);
                }
            ).catch(error => {
                console.error(error.message)
            }).finally(() => {
                if (!currentUser) {
                    AsyncStorage.getItem('@auth_userId', (error, result) => {
                        try {
                            getCurrentUser(result).then(
                                response => {
                                    setCurrentUser(response.data);
                                }).catch(error => {
                                console.error(error.message)
                            })
                        } catch {
                            console.error(error.message)
                        }
                    });
                }
            });
        })
    }, []);

    const { handleChange, handleSubmit, handleBlur, values, setFieldValue, errors, touched } = useFormik({
        initialValues: {
            notes: Appointment.notes ?? '',
            id_estate: Appointment.id_estate ?? '',
            id_customer: Appointment.id_customer ?? '',
            id_appointment_type: Appointment.apptmt_type_id ?? '',
            id_staff: Appointment.id_staff ?? '',
            date: moment(Appointment.scheduled_at),
            estate_search: null

        },
        validationSchema: Yup.object({
            notes: Yup.string(),
            id_estate: Yup.number(),
            id_customer: Yup.string().required('Veuillez sélectionner un client/contact'),
            id_appointment_type: Yup.string().required('Veuillez sélectionner un type de rendez-vous'),
            id_staff: Yup.string().required('Veuillez sélectionner un agent'),
        }),
        onSubmit: async (values) => {
            let newDate;
            let newTime;

            if (date) {
                newDate = moment(date).format('YYYY-MM-DD');
            } else {
                newDate = moment(values.date).format('YYYY-MM-DD');
            }

            if (time) {
                newTime =  moment(time).format('HH:mm');
            } else {
                newTime = moment(values.date).format('HH:mm');
            }

            const datas = {
                ...values,
                id_staff: staff ?? Appointment.id_staff,
                scheduled_at: newDate + ' ' + newTime,
                id_appointment_type: (typeAppt ?? Appointment.apptmt_type_id)
            }
            await new Promise(r => {
                EditAppointment(datas, Appointment.id)
            })
        }
    });

    const EditAppointment = (datas, AppointmentId) => {
        updateAptmt(datas, AppointmentId).then(
            response => {
                if (response.status === 200) {
                    confirmAlert()
                } else {
                    errorAlert()
                }
            }
        ).catch(error => {
            console.error(error.message);
        })
    }

    const showDatePicker = () => {
        setIsDatePickerShow(true);
    }

    const showTimePicker = () => {
        setIsTimePickerShow(true);
    }

    const onDateChange = (e, selectedDate) => {
        setDate(selectedDate);
        if (Platform.OS === 'android') {
            setIsDatePickerShow(false);
        }
    }

    const onTimeChange = (e, selectedTime) => {
        setTime(selectedTime);
        if (Platform.OS === 'android') {
            setIsTimePickerShow(false);
        }
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
            console.error(error.message);
        })
    }

    const selectEstates = (estateIT) => {
        setEstate(estateIT);
        setModalEVisible(false)
        setEstateData(null);
        setEstateInput(null);
    }

    const confirmAlert = () => {
        Alert.alert(
            '',
            'Rendez-vous modifié',
            [
                {
                    text: "Ok",
                    onPress: () => navigation.goBack()
                }
            ]
        );
    }

    const errorAlert = () => {
        Alert.alert(
            'Erreur',
            'Le rendez-vous n\'a pas été modifié',
            [
                {
                    text: "Ok",
                    onPress: () => navigation.goBack()
                }
            ]
        );
    }

    return (
        <>
            <View>
                <Topbar />
            </View>

            <ScrollView style={styles.main_container}>

                <View>
                    <Text style={styles.title}>Modifier le rendez-vous de :</Text>
                </View>
                <View>
                    <Text style={styles.customerText}>
                        {Appointment?.customerFirstname} {Appointment?.customerLastname}
                    </Text>
                </View>
                    <Text style={styles.labelText}>
                        Agent
                    </Text>
                {currentUser ? (
                    <SelectDropdown
                        name="id_staff"
                        data={staffList}
                        defaultButtonText={Appointment.staffFirstname + ' ' + Appointment.staffLastname}
                        value={values.id_staff}
                        onSelect={(selectedItem, index) => {
                            setStaff(selectedItem.id)
                            return selectedItem.id
                        }}
                        onChange={handleChange('id_staff')}
                        onBlur={handleBlur('id_staff')}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.firstname + ' ' + selectedItem.lastname
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.firstname + ' ' + item.lastname
                        }}
                        buttonStyle={styles.dropdownInput}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                        buttonTextStyle={styles.selectBtnText}
                        renderDropdownIcon={() => {
                            return <MaterialCommunityIcons name="chevron-down" size={18} color={colors.secondaryBtn} />
                        }}
                    />)
                    :
                    null
                }

                <Text style={styles.labelText}>
                    Horaire
                </Text>
                <View style={styles.datetime_container}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0}
                            onPress={showDatePicker}
                            style={styles.dateInput}>
                            <View>
                                <Text>{moment(date).format('LL')}</Text>
                            </View>
                        </TouchableOpacity>

                        {isDatePickerShow && (
                            <DateTimePicker
                                value={new Date(values.date)}
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
                            style={styles.timeInput}
                        >
                            <View>
                                <Text>{moment(time).format('LT')}</Text>
                            </View>
                        </TouchableOpacity>

                        {isTimePickerShow && (
                            <DateTimePicker
                                value={new Date(values.date)}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24hour={true}
                                onChange={onTimeChange}
                                style={styles.datePicker}
                            />
                        )}
                    </View>
                </View>
                <Text style={styles.labelText}>
                    Bien concerné
                </Text>
                <View style={styles.location}>
                    <Text>Ref: {Appointment?.reference}</Text>
                    <Text>Bien: {Appointment?.title}</Text>
                    <Text>Lieu: {Appointment?.address} {Appointment?.zipcode} {Appointment?.city}</Text>
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
                       name="estate_search"
                       value={values.estate_search}
                               clearIcon={() => {
                                   return(
                                       <TouchableOpacity onPress={() => {setFieldValue('estate_search', null)
                                           setFieldValue('id_estate', null)
                                       }}>
                                           <MaterialCommunityIcon name="window-close" size={26} color={colors.primary} />
                                       </TouchableOpacity>)
                               }}
                    />

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
                                            <TouchableOpacity onPress={() => {selectEstates(item);
                                                setFieldValue('id_estate', item.id);
                                                setFieldValue('estate_search', item.reference + ' ' + item.title)
                                            }}>
                                                <Text style={styles.modalText}>{item.city} / {item.title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item) =>item.id}
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
                </View>

                <Text style={styles.labelText}>
                    Type de rendez-vous
                </Text>
                <View>
                    <SelectDropdown
                        name="id_appointment_type"
                        data={aptmtsTypes}
                        defaultButtonText={Appointment.appointment_type}
                        value={values.id_appointment_type}
                        onSelect={(selectedItem, index) => {
                            setTypeAppt(selectedItem.id)
                            return selectedItem.id
                        }}
                        onChange={handleChange('id_appointment_type')}
                        onBlur={handleBlur('id_appointment_type')}
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
                            return <MaterialCommunityIcons name="chevron-down" size={18} color={colors.secondaryBtn} />
                        }}
                    />
                </View>

                <Text style={styles.labelText}>
                    Notes
                </Text>
                <View>
                    <TextInput
                        style={styles.textareaInput}
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Ajouter une note au rendez-vous"
                        onChangeText={handleChange('notes')}
                        onBlur={handleBlur('notes')}
                        value={values.notes}
                        defaultValue={Appointment?.notes}
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
        marginBottom: 10,
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
    dropdown: {
        borderRadius: 25
    },
    dropdownInput: {
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
    },
    customerText: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    labelText: {
        marginStart: 5,
        fontSize: 16,
        textAlign: "left"
    },
    location: {
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
    }
})

export default EditAppointment;
