import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

//npm i react-native-svg e svg transformer
// o tranformer e para trabalhar em forma de component
import Logo from '../../assets/logo.svg';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { RootStackParamList } from '../../routes/auth.routes';

import { LoadAnimation } from '../../components/LoadAnimation';

import { 
    Container, 
    Header,
    TotalCars,
    HeaderContent,
    CarList
} from './styles';


export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);   
    const navigation = useNavigation<RootStackParamList>();
    // const theme = useTheme();

    // const positionY = useSharedValue(0);
    // const positionX = useSharedValue(0);

    // const myCarsButtonStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             { translateX: positionX.value },
    //             { translateY: positionY.value },
    //         ]
    //     }
    // })

    // const onGestureEvent = useAnimatedGestureHandler({
    //     onStart(_, ctx: any){
    //         ctx.positionX = positionX.value;
    //         ctx.positionY = positionY.value;
    //     },
    //     onActive(event , ctx: any){
    //         positionX.value = ctx.positionX + event.translationX;
    //         positionY.value = ctx.positionY + event.translationY;
    //     },
    //     onEnd(){
    //         positionX.value = withSpring(0);
    //         positionY.value = withSpring(0);
    //     }
    // });

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars(){
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function fetchCars(){
            try{
                const response = await api.get('/cars');
                setCars(response.data);

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    }, []);

    // useEffect(() => {
    //     //EnvetLister fica escutando quando o botao for clicado
    //     //BackHandler é o botao de voltar do android
    //     BackHandler.addEventListener('hardwareBackPress', () => { 
    //         return true;
    //     })
    // }, [])

    return (
        <Container>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor="transparent"
                // para o statusbar ficar acima do header
                // o background tranparent é para ele ficar da cor 
                // do background que está atras - o do header
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                        />
                    {
                        !loading && 
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {loading ? <LoadAnimation /> :
                <CarList
                    data={cars}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item })=> 
                        <Car 
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    }
                />
            }

            {/* <PanGestureHandler onGestureEvent={onGestureEvent} >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated 
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons 
                            name='ios-car-sport'
                            size={32}
                            color={theme.colors.shape} 
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler> */}

        </Container>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})