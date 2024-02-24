import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { CarDTO } from "../../dtos/CarDTO";
import { FlatList, FlatListProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;
    padding: 32px 24px;

    justify-content: flex-end;
    background-color: ${({theme}) => theme.colors.header};
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.primary_400};
    color: ${({theme}) => theme.colors.text};

`;

export const HeaderContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const CarList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>)
.attrs({
    contentContainerStyle: {
        padding: 24
    },

    showsVerticalScrollIndicator: false,
})``;