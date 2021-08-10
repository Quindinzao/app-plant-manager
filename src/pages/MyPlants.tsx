import React, { useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import { PlantProps, loadPlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlants() {

    const [myBeautifulPlants, setMyBeautifulPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantStoraged = await loadPlant();

            const nextTime = formatDistance (
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWaterd (
                `Não se esqueça de regar a ${plantStoraged[0].name} à(s) ${nextTime} horas!`
            )

            setMyBeautifulPlants(plantStoraged);
            setLoading(false);
        }

        loadStorageData();
    }, [])

    return (
        <SafeAreaView style = {styles.container}>
            <Header/>

            <View style = {styles.spotligth}>
                <Image
                    source = {waterdrop}
                    style = {styles.spotligthImage}
                />
                <Text style = {styles.spotligthText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style = {styles.plants}>
                <Text style = {styles.plantsTitle}>
                    Próximas regadas:
                </Text>

                <FlatList
                    data = {myBeautifulPlants}
                    keyExtractor = {(item) => String(item.id)}
                    renderItem = {(item) => (
                        <PlantCardSecondary data = {item}/>
                    )}
                    showsHorizontalScrollIndicator = {false}
                    contentContainerStyle = {{flex: 1}}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 30
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 24,
        marginVertical: 20
    },
    spotligth: {
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        flexDirection: 'row',
        height: 110,
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    spotligthImage: {
        height: 60,
        width: 60
    },
    spotligthText: {
        color: colors.blue,
        flex: 1,
        textAlign: 'center'
    },
})