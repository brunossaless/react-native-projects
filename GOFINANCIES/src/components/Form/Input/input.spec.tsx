import React, { ReactNode } from "react";
import { render } from "@testing-library/react-native";
import { Input } from ".";

import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

const Providers: React.FC<{children: ReactNode}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input Component", () => {
  //deve ter uma cor de borda especifica for active
  test("must have specific border when active", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active={true}
      />,
      {
        // O que vai por volta do input
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId("input-email");
    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention);

    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
