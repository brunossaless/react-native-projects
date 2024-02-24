import React, { useState } from "react";
import { Feather } from '@expo/vector-icons'
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

import {
    Container,
    IconContainer,
    InputText
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function Input({
    iconName,
    value,
    ...rest
}: InputProps){
    const theme = useTheme();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocuses(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!value); /* tem conteudo e verdadeiro */
        
    }

    return (
        <Container> 
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
                />
            </IconContainer>

            <InputText
                onFocus={handleInputFocuses} /* Quando entra na caixa para digitar */
                onBlur={handleInputBlur} /* Quando sai da caixa */ 
                isFocused={isFocused}
                {...rest} 
            />
        </Container>
    );
}