import { Check, Trash } from "phosphor-react-native";
import { TaskContainer, TextDescription, TextDescriptionMarked, TouchableOpacityDeleted, TouchableOpacityIsCompleted, TouchableOpacityIsCompletedMarked } from "./styles";

type TaskProps = {
    id: string;
    description: string;
    isCompleted: boolean;
    onRemove: () => void;
    onIsCompleted: () => void;
}

export function Task({description, isCompleted, onRemove, onIsCompleted}:TaskProps){
    function renderTouchableOpacity(){
        if(!isCompleted)
            return <TouchableOpacityIsCompleted onPress={onIsCompleted}/>
            
        else 
            return <TouchableOpacityIsCompletedMarked onPress={onIsCompleted}>
                <Check size={15} color='#F2F2F2'/>
            </TouchableOpacityIsCompletedMarked>
            
    }

    function renderTextDescription(){
        if(!isCompleted)
            return <TextDescription>{description}</TextDescription>
        else 
            return <TextDescriptionMarked>{description}</TextDescriptionMarked>
    }
    return (
        <TaskContainer>
            {renderTouchableOpacity()}

            {renderTextDescription()}

            <TouchableOpacityDeleted onPress={onRemove}>
                <Trash size={24} color='#808080'/>
            </TouchableOpacityDeleted>

        </TaskContainer>
    )
}