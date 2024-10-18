"use client";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import AuthProvider from "./auth-provider";

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Provider;
