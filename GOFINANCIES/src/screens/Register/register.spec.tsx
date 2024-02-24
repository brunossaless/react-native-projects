import React from "react";
import { Register } from ".";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn(),
    };
  });

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  

describe('Register Screen', () => {
    it('should be open category modal when user click on the category button', async () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        );

        const categoryModal = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');
        // CLick event into button
        fireEvent.press(buttonCategory);

        //fot the async functions
        await waitFor(() => {
            expect(categoryModal.props.visible).toBeTruthy();
        })
    });
})