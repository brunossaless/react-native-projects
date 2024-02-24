import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from "../../components/ConfirmButton";

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

interface Navigation {
    navigate: (value: string) => void;
  }

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
    LogoWrapper
} from './styles';

export function Confirmation(){
    const { width } = useWindowDimensions();
    const navigation = useNavigation<Navigation>();
    const route = useRoute();

    const { title, message, nextScreenRoute } = route.params as Params

    function handleConfirm(){
        navigation.navigate(nextScreenRoute);
    }


    return(
        <Container>
            <StatusBar
                barStyle={"light-content"}
                translucent
                backgroundColor={'transparent'}
            />
            <LogoWrapper>
                <LogoSvg width={width}/>
            </LogoWrapper>

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>

                <Message>
                    {message}
                </Message> 
            </Content>

            <Footer>
                <ConfirmButton 
                    title="OK"
                    onPress={handleConfirm}
                />
            </Footer>

        </Container>
    );
}