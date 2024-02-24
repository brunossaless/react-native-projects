import styled from "styled-components/native";

export const TaskContainer = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    background-color: ${props => props.theme["gray-400"]};
    padding: 12px 8px 12px 12px;
    border-radius: 8px;
    margin-bottom: 8px;
`

export const TouchableOpacityIsCompleted = styled.TouchableOpacity`
    width: 24;
    height: 24;
    border-width: 2px;
    border-radius: 99px;
    border-color: ${props => props.theme.blue};
`

export const TouchableOpacityIsCompletedMarked = styled(TouchableOpacityIsCompleted)`
    border: none;
    background-color: ${props => props.theme["purple-dark"]};
    justify-content: center;
    align-items: center;
`

export const TextDescription = styled.Text`
    font-weight: 400;
    font-size: 14px;
    line-height: 19.6px;
    color: ${props => props.theme["gray-100"]};
`

export const TextDescriptionMarked = styled(TextDescription)`
    color: ${props => props.theme["gray-300"]};
    text-decoration: line-through;
    text-decoration-color: ${props => props.theme["gray-300"]};
`

export const TouchableOpacityDeleted = styled.TouchableOpacity`
`