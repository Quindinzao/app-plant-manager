import React, { useState } from 'react';
import { 
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet, 
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View 
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {

        if (!name)
        return Alert.alert('Me diz como chamá-lo 😕', 'É rápido, basta tocar na caixa de texto e digitar')

        if (name.length > 10)
        return Alert.alert('Oops! 😬', 'Nome comprido demais! Tente algo de 1 a 10 letras')

        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito carinho :)',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })
        } catch {
            Alert.alert('Não foi posível salvar o seu nome 😢')
        }
    }

    return (
        <SafeAreaView style = {styles.container}>
            
            <KeyboardAvoidingView
                behavior = {Platform.OS === 'ios' ? 'padding' : 'height'} 
                style = {styles.container}
                >
                
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    
                    <View style = {styles.content}>
                        
                        <View style = {styles.form}>
                        
                            <Text style = {styles.emoji}>
                                { isFilled ? '😊' : '🙂'}
                            </Text>
                            
                            <Text style = {styles.title}>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                            
                            <TextInput
                                autoCapitalize = 'words'
                                onBlur = {handleInputBlur}
                                onChangeText = {handleInputChange}
                                onFocus = {handleInputFocus}
                                placeholder = 'Digite o seu nome'
                                style = {[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]}
                            />
                            
                            <View style = {styles.footer}>

                                <Button
                                    title = 'Confirmar'
                                    onPress = {handleSubmit}
                                /> 

                            </View>
                        
                        </View>
                    
                    </View>
                
                </TouchableWithoutFeedback>
            
            </KeyboardAvoidingView>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        width: '100%'
    },
    content: {
        flex:1,
        width: '100%'
    },
    emoji: {
        fontSize: 54
    },
    footer: {
        marginTop: 40,
        width: '100%'
    },
    form: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        width: '100%'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
        width: '100%'
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 24,
        lineHeight: 32,
        marginTop: 20,
        textAlign: 'center'
    }
})