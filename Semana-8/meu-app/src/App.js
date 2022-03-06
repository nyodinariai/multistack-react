import { Button, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import './App.css';
import Contador from './components/MeuComponente/Contador';
//import ListaCursos from './components/ListaCursos/ListaCursos';
import useOnlineStatus from './data/hooks/useOnlineStatus';
import theme from './ui/themes/theme';

function App() {

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      alert('Sua conexão caiu')
    }
  }, [isOnline])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>
            <Contador />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
