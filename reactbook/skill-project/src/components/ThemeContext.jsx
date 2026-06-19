import { createContext, useState, useMemo } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  // Memoize value to optimize rendering performance
  const contextValue = useMemo(() => ({ dark, setDark }), [dark]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={dark ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}