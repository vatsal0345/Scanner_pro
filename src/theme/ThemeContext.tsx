import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {LightTheme, ThemeType, DarkTheme, ColorType} from './theme';
import {useColorScheme} from 'react-native';
interface ThemeContextType {
  theme: ThemeType;
  COLORS: ColorType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState<ThemeType>(
    systemTheme === 'dark' ? DarkTheme : LightTheme,
  );

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === LightTheme ? DarkTheme : LightTheme));
  };

  useEffect(() => {
    setTheme(systemTheme === 'dark' ? DarkTheme : LightTheme);
  }, [systemTheme]);

  const value = useMemo(
    () => ({
      theme,
      COLORS: theme.colors,
      toggleTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export {ThemeProvider, useTheme};
