import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
}

export const PlantCardSecondary = ({ data, ...rest } : PlantProps) => {
    return (
        <RectButton
            style = {styles.container}
            {...rest}>

            <SvgFromUri 
                uri = { data.photo } 
                height = {50} 
                width = {50}
            />
        
            <Text style = {styles.title}>
                { data.name }
            </Text>

            <View style = {styles.details}>
                <Text style = {styles.timeLabel}>
                    Regar à(s)
                </Text>
                <Text style = {styles.time}>
                    {data.hour}
                </Text>
            </View>

        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.shape,
        borderRadius: 20,
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 25,
        width: '100%'
    },
    details: {
        alignItems: 'flex-end'
    },
    time: {
        color: colors.body_dark,
        fontFamily: fonts.heading,
        fontSize: 16,
        marginTop: 5
    },
    timeLabel: {
        color: colors.body_light,
        fontFamily: fonts.text,
        fontSize: 16,
        marginTop: 5
    },
    title: {
        color: colors.heading,
        flex: 1,
        fontFamily: fonts.heading,
        fontSize: 17,
        marginLeft: 10
    }
})
