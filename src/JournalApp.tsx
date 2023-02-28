import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppRouter } from "./router/AppRouter";
export function JorunalApp() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}
