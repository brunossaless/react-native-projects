import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe('Profile Screen', () => {
    it('check if show correctly user input name placeholder', () => {
        const { getByPlaceholderText } = render(<Profile />);
    
        const inputName = getByPlaceholderText('Nome');
        
        //check if button has finded
        expect(inputName).toBeTruthy();
    });
    
    //should = deve
    it('should be load user data', () => {
        //takes a certain element on screen
        const { getByTestId } = render(<Profile />);
    
        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');
    
        expect(inputName.props.value).toEqual('Teste');
        expect(inputSurname .props.value).toEqual('Teste novamente');
    });
    
    it('should exist title correctly', () => {
        const { getByTestId } = render(<Profile />);
    
        const textTitle = getByTestId('text-title');
    
        //enough if content has this value
        expect(textTitle.props.children).toContain('Perfil')
    });
})

