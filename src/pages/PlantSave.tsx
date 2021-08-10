import React, { useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    plant: PlantProps
}

export function PlantSave() {

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android')
            setShowDatePicker(oldValue => !oldValue)

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert(`Escolha um horário no futuro! ⏰`)
        }

        if (dateTime)
            setSelectedDateTime(dateTime)
    }

    function handleOpenDateTimePickerAndroid() {
        setShowDatePicker(oldState => !oldState)
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado :)',
                buttonTitle: 'Muito obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
            })
        } catch {
            Alert.alert('Não foi posível salvar 😢')
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.plantInfo}>
                <SvgFromUri
                    uri = {plant.photo}
                    height = {150}
                    width = {150}
                />

                <Text style = {styles.plantName}>
                    {plant.name}
                </Text>

                <Text style = {styles.plantAbout}>
                    {plant.about }
                </Text>
            </View>

            <View style = {styles.controller}>
                <View style = {styles.tipContainer}>
                    <Image
                        source = {waterdrop}
                        style = {styles.tipImage}
                    />

                    <Text style = {styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style = {styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                { showDatePicker && (
                    <DateTimePicker
                        value = {selectedDateTime}
                        mode = 'time'
                        display = 'spinner'
                        onChange = {handleChangeTime}
                    />
                )}

                { Platform.OS === 'android' && (
                    <TouchableOpacity 
                        onPress = {handleOpenDateTimePickerAndroid}
                        style = {styles.dateTimePickerButton}
                        >
                        <Text style = {styles.dateTimePickerText}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                )}

                <Button
                    title = 'Cadastrar planta'
                    onPress = {handleSave}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    alertLabel: {
        color: colors.heading,
        fontFamily: fonts.complement,
        fontSize: 12,
        textAlign: 'center'
    },
    container: {
        backgroundColor: colors.shape,
        flex: 1,
        justifyContent: 'space-between'
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingBottom: getBottomSpace() || 40
    },
    dateTimePickerButton: {
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%'
    },
    dateTimePickerText: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 24
    },
    plantAbout: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 17,
        marginBottom: 30,
        marginTop: 10,
        textAlign: 'center'
    },
    plantInfo: {
        alignItems: 'center',
        backgroundColor: colors.shape,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    plantName: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 24,
        marginTop: 15
    },
    tipContainer: {
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        bottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        position: 'relative'
    },
    tipImage: {
        height: 56,
        width: 56
    },
    tipText: {
        color: colors.blue,
        flex: 1,
        fontFamily: fonts.text,
        fontSize: 17,
        marginLeft: 20,
        textAlign: 'justify'
    }
})