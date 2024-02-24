import { PlusCircle } from "phosphor-react-native";
import React, { useContext, useState } from "react";
import { Alert, FlatList } from "react-native";
import { EmptyComponent } from "../../components/EmptyComponent";
import { Header } from "../../components/Header";
import { Task } from "../../components/Task";
import { AllContainerWithoutHeader,
    Container,
    DivisorInfo, 
    InfoContainer, 
    NumberInfo, 
    StyleFormContainer, 
    TextInfo, 
    TextInputButton, 
    TouchableOpacityButton, 
    ViewRoundedTextInfo } from "./styles";
//npm install react-native-uuid
import uuid from 'react-native-uuid'
import { TaskContext } from "../../contexts/TaskContext";
import { RenderTasks } from "../../components/RenderTasks";

type Task = {
    id: string | number;
    isCompleted: boolean;
    description: string;
}

export function Home(){
    const {
        handleTaskAdd, 
        setNewTask, 
        newTask, 
        handleCountIsTrue,
        sizeTaskslength} = useContext(TaskContext)
        
    return (
        <Container>
            <Header />
            <AllContainerWithoutHeader>

                <StyleFormContainer>
                    <TextInputButton
                         placeholder="Adicionar uma nova tarefa"
                         placeholderTextColor='#808080'
                         onChangeText={setNewTask}
                         value={newTask}
                    />

                    <TouchableOpacityButton onPress={handleTaskAdd}>
                            <PlusCircle size={22} color='#F2F2F2'/>
                    </TouchableOpacityButton>
                </StyleFormContainer>

                <InfoContainer>
                    <DivisorInfo>
                        <TextInfo>Criadas</TextInfo>
                        {/* Only to leave the text round */}
                        <ViewRoundedTextInfo>
                            <NumberInfo>{sizeTaskslength()}</NumberInfo>
                        </ViewRoundedTextInfo>
                    </DivisorInfo>
                    <DivisorInfo>
                        <TextInfo>Concluídas </TextInfo>
                        {/* Only to leave the text round */}
                        <ViewRoundedTextInfo>
                            <NumberInfo>{handleCountIsTrue()}</NumberInfo>
                        </ViewRoundedTextInfo>
                    </DivisorInfo>
                </InfoContainer>

                {RenderTasks()}
            
            </AllContainerWithoutHeader>
        </Container>
    )
}