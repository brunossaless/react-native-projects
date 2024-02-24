import styled from "styled-components/native";

export const EmptyContainer = styled.View`
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    border-color: ${props => props.theme["gray-300"]};
`

const BaseText = styled.Text`
    font-size: 14;
    color: ${props => props.theme["gray-300"]};
    line-height: 19.6;

`
export const TextInfoTitle = styled(BaseText)`
    font-weight: 700;

`
export const TextInfoSubtitle = styled(BaseText)`
    font-size: 14;
`

export const ImageComponent = styled.Image`
    margin-top: 48;
    margin-bottom: 16;
`