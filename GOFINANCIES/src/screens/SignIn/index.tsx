import { useContext, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from 'react-native'

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from "./styles";

import { SignInSocialButton } from '../../components/SignInSocialButton'

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);

    const {colors} = useTheme()

    // deixando a forma de usar o context mais simples
    // e limpa
    const { signInWithGoogle, signInWithApple } = useAuth();

    async function handleSignInWithGoogle(){
        try{
            setIsLoading(true);
            return await signInWithGoogle();
        }catch(error){
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta google')
            // só desabilita o loading caso der algum erro
            setIsLoading(false);
        }
        
    }

    async function handleSignInWithApple(){
        try{
            setIsLoading(true);
            return await signInWithApple();
        } catch(error){
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta apple')
            setIsLoading(false);
        }
    }
    
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'} 
                        muito simples
                    </Title>

                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'} 
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com o Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                { 
                    Platform.OS === 'ios' &&
                    <SignInSocialButton
                    // Apple só da para testar autenticação em um dispositivo IOS real
                    // Apple so da as credenciais a primeira vez que logga
                    // como nome, emai, sobrenome...
                        title="Entrar com o Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    /> 
                }

                </FooterWrapper>

                { isLoading && 
                    <ActivityIndicator 
                        color={colors.shape} 
                        style={{marginTop:18}}
                    />}
            </Footer>

        </Container>
    );
}