import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { Resume } from '../screens/Resume';



const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                // Menu que estiver ativo e os não ativo muda de cor
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,

                //Icon e text ao lados
                tabBarLabelPosition: 'beside-icon',

                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen 
                name='Listagem'
                component={Dashboard}
                options={{
                    //desestrutura para pegar os valores que coloquei 
                    // la no tabBarStyle

                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen 
                name='Cadastrar'
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen 
                name='Resumo'
                component={Resume}
                options={{
                    tabBarIcon: (({size, color}) =>
                        <MaterialIcons
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    )
}