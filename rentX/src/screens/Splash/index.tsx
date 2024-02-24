import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { RootStackParamList } from '../../routes/auth.routes';


import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    interpolate, 
    Extrapolate,
    runOnJS
} from "react-native-reanimated";

import { 
    Container 
} from "./styles";

export function Splash(){
    /* ANOTATIONS ---
    //tudo do animated é focado em performance
    //Compartilhar valor com as animações
    const animation = useSharedValue(0);

    //animando elemento de forma animada, estilo animado
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { 
                    translateX: withTiming(animation.value, {
                        duration: 1000,
                        easing: Easing.bezier(0,.67,1, .14),
                    }) 
                }
            ]
        }
    });

    function handleAnimationPosition(){
        animation.value = Math.random() * (WIDTH - 100);
    }
    --- ANOTATIONS 
    */

   const navigation = useNavigation<RootStackParamList>();
   const splashAnimation = useSharedValue(0);

   const brandStyle = useAnimatedStyle(() => {
    return {
        opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
        transform: [
            {
                translateX: interpolate(splashAnimation.value,
                    [0, 50],
                    [0, -50],
                    Extrapolate.CLAMP)
            }
        ],
    }   
   })

   const logoStyle = useAnimatedStyle(() => {
    return {
        opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
        transform: [
            {
                translateX: interpolate(splashAnimation.value,
                    [0, 50],
                    [-50, 0],
                    Extrapolate.CLAMP)
            }
        ]
    }
   })

   function startApp(){
     navigation.navigate('SignIn');
   }

   useEffect(() => {
    splashAnimation.value = withTiming(
        50, 
        { duration: 2000 },
        () => {
            //redirecionando para a thread para rodar o JS
            // fatia de codigo para voltar para a thread
            // executando em codigo js
            'worklet' 
            runOnJS(startApp)();
        }
    );
   }, [])

    return (
        <Container>
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
}