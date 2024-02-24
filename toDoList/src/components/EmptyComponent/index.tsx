import { EmptyContainer, ImageComponent, TextInfoSubtitle, TextInfoTitle } from "./styles";
const ImgageClipboard = require('../../../assets/Clipboard.png')
export function EmptyComponent(){
    return (
        <EmptyContainer>
            <ImageComponent 
                source={ImgageClipboard}
            />
            <TextInfoTitle>Você ainda não tem tarefas cadastradas</TextInfoTitle>
            <TextInfoSubtitle>Crie tarefas e organize seus itens a fazer</TextInfoSubtitle>
        </EmptyContainer>
    )
}