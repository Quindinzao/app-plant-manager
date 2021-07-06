import React from 'react';
import { 
    Dimensions,
    Image, 
    StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (
        
        <View style = {styles.container}>

            <Text style = {styles.title}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>

            <Image
                source = {wateringImg}
                style = {styles.image}
                resizeMode = 'contain'
            />

            <Text style = {styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity
                style = {styles.button} 
                activeOpacity = {0.7}
                onPress = {handleStart}
                >
                
                <Feather
                    style = {styles.buttonIcon} 
                    name = 'chevron-right'
                />

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.green,
        borderRadius: 16,
        height: 56,
        justifyContent: 'center',
        marginBottom: 20,
        width: 56
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    subtitle: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 18,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 34,
        marginTop: 38,
        textAlign: 'center'
    }
});