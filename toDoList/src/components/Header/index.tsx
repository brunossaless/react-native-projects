import { HeaderContainer } from "./styles";
import { Image } from "react-native";
const imagageLogo = require('../../../assets/Logo.png')

export function Header(){
    
    return (
        <HeaderContainer>
            <Image 
                source={imagageLogo}
            />
        </HeaderContainer>
    )
}