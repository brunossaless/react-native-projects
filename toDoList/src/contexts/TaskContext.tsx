import { createContext, ReactNode, useState } from "react";
import { Alert } from "react-native";
import uuid from 'react-native-uuid'

type TaskContextType = {
    tasks: Task[];
    newTask: string;
    setNewTask: (input: string) => void;
    handleTaskRemove: (id: string, description: string) => void;
    handleTaskIsCompleted: (id: string) => void;
    handleCountIsTrue: () => number;
    sizeTaskslength: () => number;
    handleTaskAdd: () => void;
}

type Task = {
    id: string | number;
    isCompleted: boolean;
    description: string;
}

type TaskContextProps = {
    children: ReactNode;
}

export const TaskContext = createContext({} as TaskContextType)

export function TaskContextProvider({children} : TaskContextProps){
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState("")

    function handleTaskAdd(){
        const taskAddHandleObj:Task = {
            id: uuid.v4().toString(),
            description: newTask,
            isCompleted: false,
        }
        setTasks(preventState => [...preventState, taskAddHandleObj])
        setNewTask("")
    }

    function handleTaskRemove(id: string, description: string){
        Alert.alert('Remover Tarefa', `Remover a tarefa:${description.substring(0, 10)}...?`,[
            {
                text: 'Sim',
                onPress: () => setTasks(preventState => preventState.filter(task => task.id !== id)),
            },
            {
                text: 'Nao',
                style: 'cancel'
            }
        ])
    }

    function handleTaskIsCompleted(id: string){
        const tasksWithoutUpdateOne = tasks
        tasksWithoutUpdateOne.map((task) => {
            if (task.id === id){
                const checked = task.isCompleted ? false : true 
                task.isCompleted = checked
            }
        })
        setTasks([...tasksWithoutUpdateOne])
    }

    function handleCountIsTrue(){
        const countTaksWithTrue = tasks.filter((task) => {
            return task.isCompleted === true
        })
        return countTaksWithTrue.length
    }
    function sizeTaskslength(){
        return tasks.length
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            handleCountIsTrue,
            handleTaskIsCompleted,
            handleTaskRemove,
            handleTaskAdd,
            sizeTaskslength,
            setNewTask,
            newTask
        }}>
            {children}
        </TaskContext.Provider>
    )

}
