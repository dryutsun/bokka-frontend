import { Global } from "@emotion/react"

const Fonts = () => (
    <Global
      styles={`
      @font-face {
        font-family: 'Sackers Gothic Light AT';
        src: url('./fonts/Sackers Gothic Light AT.otf') format('otf');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
        `}
    />
  )
  