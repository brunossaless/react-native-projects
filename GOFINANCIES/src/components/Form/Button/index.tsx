import { RectButtonProps } from "react-native-gesture-handler";

import { 
    Container,
    Title 
} from "./styles";

interface Props extends RectButtonProps {
    title: string;
    //tirar o conflito do onpress com a biblioteca do rectButton
    onPress: () => void;
}

export function Button({
    title, 
    onPress,
    ...rest
} : Props){
    return (
        <Container onPress={onPress} {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    )
}