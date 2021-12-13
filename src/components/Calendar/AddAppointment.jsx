import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from "react-native";
import moment from 'moment';
import 'moment/locale/fr';
import Topbar from "../Topbar/Topbar";
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import colors from "../../utils/styles/colors";
import {FontAwesome5} from "@expo/vector-icons";

const AddAppointment = () => {

    const DATA = ["Tata", "Titi", "Toto", "Tutu"]

    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());
    const [note, setNote] = useState();
    const [isDatePickerShow, setIsDatePickerShow] = useState(false);
    const [isTimePickerShow, setIsTimePickerShow] = useState(false);

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
                    <SelectDropdown
                        data={DATA}
                        defaultButtonText={"Client"}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        buttonStyle={styles.dropdownInput}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                        buttonTextStyle={styles.selectBtnText}
                        renderDropdownIcon={() => {
                            return <FontAwesome5 name="chevron-down" size={18} color={colors.secondaryBtn} />;
                        }}
                    />
                </View>

                <View>
                    <SelectDropdown
                        data={DATA}
                        defaultButtonText={"Bien"}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.dropdownInput}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                        buttonTextStyle={styles.selectBtnText}
                        renderDropdownIcon={() => {
                            return <FontAwesome5 name="chevron-down" size={18} color={colors.secondaryBtn} />;
                        }}
                    />
                </View>

                <View>
                    <SelectDropdown
                        data={DATA}
                        defaultButtonText={"Type"}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.dropdownInput}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                        buttonTextStyle={styles.selectBtnText}
                        renderDropdownIcon={() => {
                            return <FontAwesome5 name="chevron-down" size={18} color={colors.secondaryBtn} />;
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
    },
    btnText: {
        color: colors.backgroundPrimary,
        textAlign: 'center',
        fontSize: 18,
    }
})

export default AddAppointment;
