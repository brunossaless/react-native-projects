import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme["gray-500"]};
`
export const StyleFormContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    margin-top: -25px;
    `
export const AllContainerWithoutHeader = styled.View`
    flex: 1;
`

export const TextInputButton = styled.TextInput`
    border-radius: 6;
    border: 1px solid ${props => props.theme["gray-700"]};
    background-color: ${props => props.theme["gray-500"]};
    width: 271;
    height: 54;
    color: ${props => props.theme["gray-100"]};
    padding: 16px;
    `

export const TouchableOpacityButton = styled.TouchableOpacity`
    height: 52;
    width: 52;
    background-color: ${props => props.theme["blue-dark"]};
    border-radius: 6;
    margin-left: 4;
    justify-content: center;
    align-items: center;
`

export const InfoContainer = styled.View`
    /* width: 326px; */
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 32px;
    padding-bottom: 20px;
`
export const DivisorInfo = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const TextInfo = styled.Text`
    color: ${props => props.theme.blue};
    font-size: 14;
    line-height: 17;
    font-weight: 700;
    margin-right: 8px;
`
export const NumberInfo = styled.Text`
    color: ${props => props.theme["gray-200"]};
    font-size: 12;
    height: 19;
    width: 25;
    padding: 2px 8px 2px 8px;
    text-align: center;
`

// Only to leave the text round
export const ViewRoundedTextInfo = styled.View`
    margin-left: 8px;
    border-radius: 999px;
    background-color: ${props => props.theme["gray-400"]};
    justify-content: center;
    align-items: center;
`
