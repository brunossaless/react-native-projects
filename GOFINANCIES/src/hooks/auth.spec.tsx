import { renderHook, act } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from "./auth";

import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'


jest.mock('expo-auth-session', () => {
    return {
        startAsync: () => {
            return {
                type: 'success',
                params: {
                    access_token: 'google-token-example'
                }
            }
        }
    }
})

//

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)


describe('Auth Hook', () => {
    test('should be able to sign in with Google account existing', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                id: `userInfo.id`,
                email: `userInfo.email`,
                name: `userInfo.given_name`,
                photo: `userInfo.picture`,
                locale: `userInfo.locale`,
                verified_email: `userInfo.verified_email`,
            })
        })) as jest.Mock;
        
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).toBeTruthy();
    });

    test('user should not connected if cancel autentication with google', async () => {
        const googleMocked = mockAsyncStorage
        
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

        await act(() => result.current.signInWithGoogle());

        //toHaveProperty: if exist prop 'id'
        //not === !
        expect(result.current.user).not.toHaveProperty('idd');
    });

    test('shoud be error with incorrectly google params', async () => {
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

        try {
            await act(() => result.current.signInWithGoogle());
        } catch {
            expect(result.current.user).not.toEqual({});
        }
    });
})