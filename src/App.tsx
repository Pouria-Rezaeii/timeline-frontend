import React from "react";
import { theme } from "./services/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { ThemeProvider } from "@mui/styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
