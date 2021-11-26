import { Entypo as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from "formik";
import React, { forwardRef, useRef } from 'react';
import { Image, StyleSheet, Text, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from "yup";
import { login } from '../../API/ApiStaff';
import colors from '../../utils/styles/colors';

const Button = ({ label, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                borderRadius: 25,
                height: 50,
                width: 245,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primaryBtn
            }}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text
                style={{ fontSize: 18, color: 'white', textTransform: 'uppercase' }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}
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

const SignIn = () => {

    const password = useRef(null);
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .required('Champ requis'),
            password: Yup.string()
                .required('Champ requis'),
        }),
        onSubmit: async (values) => {
            await new Promise(r => {
                signIn(values)
            })
            alert(`Login: ${values.login}, Password: ${values.password}`)
        }
    });

    const signIn = (values) => login(values).then(
        response => {
            try {
                AsyncStorage.setItem(
                    '@auth:token',
                    response.data.token
                );
                AsyncStorage.setItem(
                    '@auth:userId',
                    (response.data.user.id).toString()
                );
            } catch (error) {
                console.log("Error saving data")
                console.log(error);
            }
            // window.location.href = '/';
        }).catch(error => {
            console.log("catch !",error.message);
        })

    return (
        <View  style={{flex: 1}}>
            {/* Logo */}
            <View
                style={{
                    flex: 2,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }}
            >
                <Image style={{borderRadius: 10}} source={require('../../../assets/android-icon-192x192.png')} />
            </View>

            {/* Formulaire */}
            <View
                style={{
                    flex: 2,
                    backgroundColor: colors.backgroundPrimary,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={ styles.connexiontH1 }>
                    Connectez-vous
                </Text>
                <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                    <TextInput
                        icon='user'
                        placeholder='Entrer votre login'
                        autoCapitalize='none'
                        autoCompleteType='username'
                        keyboardType='default'
                        keyboardAppearance='dark'
                        returnKeyType='next'
                        returnKeyLabel='next'
                        onChangeText={handleChange('login')}
                        onBlur={handleBlur('login')}
                        error={errors.login}
                        touched={touched.login}
                        onSubmitEditing={() => password.current?.focus()}
                    />
                </View>
                <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                    <TextInput
                        icon='key'
                        placeholder='Entrer votre mot de passe'
                        secureTextEntry
                        autoCompleteType='password'
                        autoCapitalize='none'
                        keyboardAppearance='dark'
                        returnKeyType='go'
                        returnKeyLabel='go'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                        ref={password}
                        onSubmitEditing={() => handleSubmit()}
                    />
                </View>
                <Button label='Connexion' onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    styledInput: {

    },
    connexionForm: {

    },

    connexiontH1: {
        color: colors.secondary,
        fontSize: 25,
        marginBottom: 16
    },
    connexionLabel: {

    },

})

export default SignIn;