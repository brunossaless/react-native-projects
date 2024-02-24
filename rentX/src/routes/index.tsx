import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from "../hooks/auth";

import { AppTabRoutes } from "./app.tab.routes";
import { Authroutes } from "./auth.routes"; 

export function Routes(){
    const { user } = useAuth();

    return (
        <NavigationContainer>
            { user ? <AppTabRoutes /> : <Authroutes />}
        </NavigationContainer>
    );
}