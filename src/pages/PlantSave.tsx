import React from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSave() {
    return (
        <View style = {styles.container}>
            <View style = {styles.plantInfo}>
                <SvgFromUri
                    uri = ''
                    height = {150}
                    width = {150}
                />

                <Text style = {styles.plantName}>
                    Nome da Planta
                </Text>

                <Text style = {styles.plantAbout}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio illum vitae maiores, 
                    illo quibusdam nostrum officia laborum fugiat
                </Text>
            </View>

            <View style = {styles.controller}>
                <View style = {styles.tipContainer}>
                    <Image
                        source = {waterdrop}
                        style = {styles.tipImage}
                    />

                    <Text style = {styles.tipText}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </Text>
                </View>

                <Text style = {styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                <Button
                    title = 'Cadastrar planta'
                    onPress = {() => {}}
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
        marginBottom: 5,
        textAlign: 'center'
    },
    container: {
        backgroundColor: colors.shape,
        flex: 1,
        justifyContent: 'space-between'
    },
    controller: {
        backgroundColor: colors.white,
        paddingBottom: getBottomSpace()
    },
    plantAbout: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 17,
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
        botton: 60,
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