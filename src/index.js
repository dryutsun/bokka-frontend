import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: "#516EBF",
    100: "#3C7FEA",
    200: "#B84942",
    300: "#B4D8D8",
    400: "#0D2125",
    500: "#2D88AF",
    600: "#417B79",
    700: "#D7783E",
    800: "#306150",
    900: "#080819"
  }
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};


const theme = extendTheme({ colors, config });





ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
