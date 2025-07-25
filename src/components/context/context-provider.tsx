'use client';

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


export function ContextProvider({
  children
} : {
  children: ReactNode
}) {

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      
    >
      {children}
    </NextThemesProvider>
  );
}
