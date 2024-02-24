import styled, {css} from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconsProps {
    type: 'up' | 'down';
}

interface ButtonProps {
    isActivity: boolean;
    type: 'up' | 'down';
}

//quando tem borda usa o rectButton
//sem borda usa o bordlessButton
export const Container = styled.View<ButtonProps>`
    width: 48%;

    border-width: ${({isActivity}) => isActivity ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({theme}) => theme.colors.text};
    border-radius: 5px;


    ${({isActivity, type}) => isActivity && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.sucess_light};
    `};

    ${({isActivity, type}) => isActivity && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light};
    `}
`

export const Icon = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({theme, type}) => 
        type === 'up' ? theme.colors.sucess : theme.colors.attention
    };
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px;

`