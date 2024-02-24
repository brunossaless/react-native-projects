import { RootStackParamList } from "./stack.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}