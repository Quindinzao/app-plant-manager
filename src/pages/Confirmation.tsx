import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Button} from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string,
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug'
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😊'
}

export function Confirmation() {

    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleMoveOn() {
        navigation.navigate(nextScreen)
    }

    return (
        <SafeAreaView style = {styles.container}>
            
            <View style = {styles.content}>

                <Text style = {styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.subtitle}>
                    {subtitle}
                </Text>

                <View style = {styles.footer}>

                    <Button
                        title = {buttonTitle}
                        onPress = {handleMoveOn}
                    />
                    
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around'
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        width: '100%'
    },
    emoji: {
        fontSize: 78
    },
    footer: {
        marginTop: 20,
        paddingHorizontal: 50,
        width: '100%'
    },
    subtitle: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 17,
        paddingVertical: 10,
        textAlign: 'center'
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 22,
        lineHeight: 38,
        marginTop: 15,
        textAlign: 'center'
    }
})