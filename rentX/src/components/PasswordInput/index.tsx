import React, { useState } from "react";
import { Feather } from '@expo/vector-icons'
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import {
    Container,
    IconContainer,
    InputText,
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({
    iconName,
    value,
    ...rest
}: InputProps){
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!value); /* tem conteudo e verdadeiro */
        
    }

    function handlePasswordVisibilityChange(){
        /* Investe o estado */
        setIsPasswordVisible(prevState => !prevState)
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
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                secureTextEntry={isPasswordVisible}
                isFocused={isFocused}
                {...rest} 
            />
            
            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_details}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}