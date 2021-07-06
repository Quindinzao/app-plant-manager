import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load'

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string
    }
}

export function PlantSelect() {

    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    function handleEvironmentSelected(environment : string) {
        setEnvironmentSelected(environment);

        if (environment == 'all')
            return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)    
        );

        setFilteredPlants(filtered)

    }

    async function fetchPlants() {
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const {data} = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fetchEnvironment();
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])

    if(loading)
        return <Load/>

    return (
        <SafeAreaView style = {styles.container}>

            <View style = {styles.header}>
                    
                <Header/>
                
                <Text style = {styles.title}>
                    Em qual ambiente
                </Text>

                <Text style = {styles.subtitle}>
                    você quer colocar sua planta?
                </Text>

                <View>
                
                </View>

            </View>

            <View>
                <FlatList
                    data = {environments}
                    keyExtractor = { (item) => String(item.key)}
                    renderItem = {({ item }) => (
                        <EnvironmentButton
                            title = {item.title}
                            active = {item.key === environmentSelected}
                            onPress = {() => handleEvironmentSelected(item.key)}
                            />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    contentContainerStyle = {styles.environmentList}
                />
            </View>

            <View style = {styles.plants}>
                <FlatList
                    data = {filteredPlants}
                    keyExtractor = { (item) => String(item.id)}
                    renderItem = {({ item }) => (
                        <PlantCardPrimary data = {item } />
                    )}
                    showsVerticalScrollIndicator = {false}
                    numColumns = {2}
                    onEndReachedThreshold = {0.1}
                    onEndReached = {({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)    
                    }
                    ListFooterComponent = {
                        loadingMore ? //if loadingMore == true, what’s on the line below will happen,
                        <ActivityIndicator color = {colors.green}/>
                        : //else, what’s on the line below will happen.
                        <></>
                    }
                />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    button: {
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        marginVertical: 24,
        paddingBottom: 5,
        paddingHorizontal: 32
    },
    header: {
        paddingHorizontal: 30
    },
    plants: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },
    subtitle: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 17,
        lineHeight: 20,
        marginTop: 15
    }
})