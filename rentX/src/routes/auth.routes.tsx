import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Confirmation } from "../screens/Confirmation";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";

export type RootStackParamList = {
    [x: string]: any;
    Home: undefined;
    CarDetails: string;
    Scheduling: undefined;
    SchedulingDetails: undefined
    Confirmation: {
        title: string;
        message: string;
        nextScreenRoute: string;
    };
  };

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function Authroutes(){
    return (
        <Navigator initialRouteName="Splash" screenOptions={{
            headerShown: false
        }}>
            <Screen
                name="Splash"
                component={Splash}
            />
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="SignUpFirstStep"
                component={SignUpFirstStep}
            />
            <Screen
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            />
            <Screen
                name="Confirmation"
                component={Confirmation}
            />
        </Navigator>
    );
}