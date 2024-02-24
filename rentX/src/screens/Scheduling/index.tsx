import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { StatusBar } from "react-native";
import { format } from "date-fns/esm";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval } from "../../components/Calendar";
import { CalendarProps } from "react-native-calendars";

import ArrowSvg from '../../assets/arrow.svg';
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    ViewDateValue,
    Content,
    Footer,
} from './styles'
import { RootStackParamList } from "../../routes/stack.routes";

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling(){
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<CalendarProps>({} as CalendarProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation<RootStackParamList>();

    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRental() {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }

    function handleBack(){
        navigation.goBack();
    }

    function handleChangerDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date;
        
        if (start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

    return (
        <Container>
            <Header>
                <StatusBar 
                    barStyle={"light-content"}
                    translucent
                    backgroundColor={"transparent"}
                />
                <BackButton 
                    onPress={handleBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início {'\n'}
                    fim do aluguel {'\n'}
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <ViewDateValue selected={!!rentalPeriod.startFormatted}>
                            <DateValue>{rentalPeriod.startFormatted}</DateValue>
                        </ViewDateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <ViewDateValue selected={!!rentalPeriod.endFormatted}>
                            <DateValue>{rentalPeriod.endFormatted}</DateValue>
                        </ViewDateValue>
                    </DateInfo>
                </RentalPeriod>

            </Header>

            <Content>
                <Calendar 
                    markedDates={markedDates}
                    onDayPress={handleChangerDate}
                />
            </Content>

            <Footer>
                <Button 
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>

        </Container>
    );
}