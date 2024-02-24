import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";

import * as Yup from 'yup';

import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Button"; 
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles';

export function SignIn(){
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const { signIn } = useAuth();

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({
                email: Yup
                    .string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup
                    .string()
                    .required('A senha é obrigatória')
            });
    
            await schema.validate({ email, password });
            
            signIn({ email, password })
            Alert.alert('Tudo certo!')
        } catch(error){
            /* se o error for do tipo de validação da yup */
            if (error instanceof Yup.ValidationError){
               Alert.alert('Erro na validação do yup', error.message);
            }else {
                Alert.alert('Erro na autenticação', 
                'Ocorreu um erro ao fazer o login, verifique as credenciais')
            }
        }
        
    }

    function handleNewAccount(){
        navigation.navigate('SignUpFirstStep');
    }

    return (
        /* KeyboardAvoidingView : sobre todos os elementos 
        quando o teclado e ativado */
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent //status bar fica como um absolute
                    />

                    <Header>
                        <Title>Estamos{'\n'}quase lá</Title>
                        <SubTitle>Faça seu login para começar{'\n'}
                            uma experiência incrível.</SubTitle>
                    </Header>

                    <Form>
                        <Input 
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none" /* Primeira letra maiuscula */
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput 
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuita"
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            color={theme.colors.background_secondary}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}