import React, {forwardRef, useEffect, useState} from 'react';
import {
    FlatList,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput as RNTextInput,
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

const TextInput = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
    const validationColor = !touched ? colors.secondaryBtn : error ? colors.primaryBtn : colors.secondaryBtn;
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                borderRadius: 25,
                borderColor: validationColor,
                borderWidth: StyleSheet.hairlineWidth,
                padding: 8
            }}
        >
            <View style={{ padding: 8 }}>
                <Icon name={icon} color={validationColor} size={16} />
            </View>
            <View style={{ flex: 1 }}>
                <RNTextInput
                    underlineColorAndroid='transparent'
                    placeholderTextColor='rgba(34, 62, 75, 0.7)'
                    ref={ref}
                    {...otherProps}
                />
            </View>
        </View>
    );
});

const EditAppointment = ({route}) => {
    const { Appointment } = route.params;
    const [currentUser, setCurrentUser] = useState(null);
    const [date, setDate] = useState();
    const [time, setTime] = useState(moment());
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

    let dateMin = moment().format('YYYY-MM-DD');
    let dateValue = moment(Appointment.scheduled_at);

    useEffect(() => {
        getStaffList().then(
            response => {
                setStaffList(response.data)
            }
        ).catch(error => {
            console.log(error.message)
        }).finally(() => {
            getAptmtsTypes().then(
                response => {
                    setAptmtsTypes(response.data);
                }
            ).catch(error => {
                console.log(error.message)
            }).finally(() => {
                if (!currentUser) {
                    AsyncStorage.getItem('@auth_userId', (error, result) => {
                        try {
                            getCurrentUser(result).then(
                                response => {
                                    setCurrentUser(response.data);
                                }).catch(error => {
                                console.log(error.message)
                            })
                        } catch {
                            console.log(error.message)
                        }
                    });
                }
            });
        })
    }, []);

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            notes: Appointment.notes ?? '',
            id_estate: Appointment.id_estate ?? '',
            id_customer: Appointment.id_customer ?? '',
            id_appointment_type: Appointment.apptmt_type_id ?? '',
            id_staff: Appointment.id_staff ?? '',
            date: dateValue,

        },
        validationSchema: Yup.object({
            notes: Yup.string(),
            id_estate: Yup.number(),
            id_customer: Yup.string().required('Veuillez sélectionner un client/contact'),
            id_appointment_type: Yup.string().required('Veuillez sélectionner un type de rendez-vous'),
            id_staff: Yup.string().required('Veuillez sélectionner un agent'),
            // scheduled_at: Yup.string().required('Veuillez choisir un horaire et une date')
        }),
        onSubmit: async (values) => {
            console.log('VALUES', values);
            const scheduled_at = moment(date).format('YYYY-MM-DD') + ' ' + moment(time).format('HH:mm:ss');
            const datas = {
                ...values, scheduled_at: scheduled_at, id_appointment_type: (typeAppt ?? Appointment.apptmt_type_id)
            }
            await new Promise(r => {
                EditAppointment(datas, Appointment.id)
            })
        }
    });

    const EditAppointment = (datas, AppointmentId) => {
        console.log(datas);
        // updateAptmt(datas, AppointmentId).then(
        //     response => {
        //         console.log(response, "response");
        //     }
        // ).catch(error => {
        //     console.log(error.message);
        // })
    }

    const showDatePicker = () => {
        setIsDatePickerShow(true);
    }

    const showTimePicker = () => {
        setIsTimePickerShow(true);
    }

    const onDateChange = (e, selectedDate) => {
        console.log('EVENT', e)
        console.log('DATE', selectedDate);
        setDate(selectedDate || dateValue);
        if (Platform.OS === 'android') {
            setIsDatePickerShow(false);
        }
    }

    const onTimeChange = (e, selectedTime) => {
        setTime(selectedTime || dateValue);
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
            console.log(error.message);
        })
    }

    const selectEstates = (estateIT) => {
        setEstate(estateIT);
        setModalEVisible(false)
        setEstateData(null);
        setEstateInput(null);
    }

// console.log(Appointment);

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
                {currentUser ? (
                    <SelectDropdown
                        name="id_staff"
                        data={staffList}
                        defaultButtonText={'Agent'}
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

                <View style={styles.datetime_container}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0}
                            onPress={showDatePicker}
                            style={styles.dateInput}>
                            <View>
                                <Text>{values.date.format('LL')}</Text>
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
                                <Text>{values.date.format('LT')}</Text>
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
                <View>
                    <Text>{Appointment?.reference} - {Appointment?.title} - {Appointment?.city}</Text>
                    {/*<TextInput editable={false}*/}
                    {/*    // style={{ display: 'none' }}*/}
                    {/*    onChangeText={handleChange('id_estate')}*/}
                    {/*    onBlur={handleBlur('id_estate')}*/}
                    {/*    value={values.id_estate}>*/}
                    {/*    {estate.id}*/}
                    {/*</TextInput>*/}
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
                                                <Text style={styles.modalText}>{item.city} / {item.title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(index) => index}
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

                <View>
                    <SelectDropdown
                        name="id_appointment_type"
                        data={aptmtsTypes}
                        defaultButtonText={"Type"}
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

                <View>
                    <TextInput
                        name="notes"
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Ajouter une note au rendez-vous"
                        onChangeText={handleChange('notes')}
                        onBlur={handleBlur('notes')}
                        value={Appointment?.notes}
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
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default EditAppointment;
