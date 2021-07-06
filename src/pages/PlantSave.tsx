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

import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';

export function PlantSave() {
    return (
        <>
            <View style = {styles.container}>
                <SvgFromUri
                    uri = ''
                    height = {150}
                    width = {150}
                />

                <Text style = {styles.plantName}>
                    Nome da Planta
                </Text>

                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aut laborum vitae, id nisi reprehenderit laudantium,
                    pariatur ratione deleniti quam quae architecto voluptas maxime accusantium? Enim tenetur cumque et adipisci!
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

                <Text> style = {styles.alertLabel}
                    Escolha o melhor horário para set=r lembrado:
                </Text>

                <Button
                    title = 'Cadastrar planta'
                    onPress = {() => {}}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    alertLabel: {

    },
    container: {

    },
    controller: {

    },
    plantAbout: {

    },
    plantName: {

    },
    tipContainer: {

    },
    tipImage: {

    },
    tipText: {

    }
})