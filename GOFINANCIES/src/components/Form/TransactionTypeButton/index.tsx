import { RectButtonProps } from "react-native-gesture-handler";

import { 
    Container, 
    Title, 
    Icon,
    Button
} from "./styles";

interface Props extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActivity: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({
  type,
  title,
  isActivity,
  ...rest
}: Props) {
  return (
    <Container isActivity={isActivity} type={type} {...rest}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
