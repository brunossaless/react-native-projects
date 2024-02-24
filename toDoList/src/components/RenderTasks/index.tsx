import { useContext } from "react";
import { FlatList } from "react-native";
import { TaskContext } from "../../contexts/TaskContext";
import { EmptyComponent } from "../EmptyComponent";
import { Task } from "../Task";

export function RenderTasks(){
    const {tasks, handleTaskRemove, handleTaskIsCompleted} = useContext(TaskContext)
    return (
        <FlatList 
                    data={tasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={
                        ({item}) => (
                            <Task
                                description={item.description}
                                isCompleted={item.isCompleted}
                                id={item.id.toString()}
                                key={item.id}
                                onRemove={() => handleTaskRemove(item.id.toString(), item.description)}
                                onIsCompleted={() => handleTaskIsCompleted(item.id.toString())}
                            />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <EmptyComponent />
                    )}
                />
    )
}