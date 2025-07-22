'use client'

import * as React from "react"
import { ThemeProvider } from "./theme-provider"

export function ContextProvider({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        
      >
        {children}
      </ThemeProvider>
    </>
  );
}
