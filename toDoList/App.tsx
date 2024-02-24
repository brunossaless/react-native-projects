import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { TaskContextProvider } from './src/contexts/TaskContext';
import { Home } from './src/screens/Home';
import { defaultTheme } from './src/styles/theme/default';


//react-native não suporta o createGlobalStyle
export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'white'}
        translucent
      />
      <TaskContextProvider>
        <Home />
      </TaskContextProvider>
    </ThemeProvider>
  );
}
