import React, { 
    createContext, 
    ReactNode, 
    useContext,
    useEffect,
    useState 
} from 'react'

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData{
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// organizando o contexto
function AuthProvider({children} : AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(false);

    const useStorageKey = '@gofinance:user';

    // authentication with google
    async function signInWithGoogle(){
        try{
            const RESPONSE_TYPE = 'token';
            // encondeURI transforma os caracteres não reconheciveis para 
            // reconhecivel pela url
            // trocar espaço por % na url... ou por =
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession
            .startAsync({ authUrl}) as AuthorizationResponse;

            if (type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                
                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    photo: userInfo.picture
                }

                setUser(userLogged);
                await AsyncStorage.setItem(useStorageKey, JSON.stringify(userLogged));
            }

        }catch(error){
            console.log(String(error));
        }
    }

    async function signInWithApple(){
        try {
            const credentials = await AppleAuthentication
            .signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if(credentials){
                const name = credentials.fullName!.givenName!;
                // API que retorna uma imagem com as iniciais do nome
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
                const userLogged = {
                    id: String(credentials.user),
                    email: credentials.email!,
                    name,
                    photo,
                }

                setUser(userLogged);
                await AsyncStorage.setItem(useStorageKey, JSON.stringify(userLogged));
            }
        } catch (error) {
            console.log(String(error));
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(useStorageKey);
    }

    useEffect(() => {
        async function loadStorageDate(){
            const userStoraged = await AsyncStorage.getItem(useStorageKey);
            
            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }

        loadStorageDate();
    }, []);

    return <AuthContext.Provider value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading
    }}>
            {children}
        </AuthContext.Provider>
}

// criando o meu proprio hook
function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth}