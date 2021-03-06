import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnvironmentButton ({
    title,
    active = false,
    ...rest
} : EnvironmentButtonProps) {
    return (
        <RectButton 
            style = 
                {[ 
                    styles.container,
                    active && styles.containerActive
                ]}
                {...rest}>
        
            <Text style = {[
                    styles.text,
                    active && styles.textActive
                ]}>
                { title }
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.shape,
        borderRadius: 12,
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 4,
        width: 76
    },
    containerActive: {
        backgroundColor: colors.green_light,
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
})