// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    palette: {
      primary: {
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
      }
      secondary: {
        default: string;
        washedOut: string
      }
      accent: {
        default: string;
        hover: string;
        disabled: string;
      }
      buttonText: string
   },
   animation: {
     micro: string;
   },
   breakpoints: {
     three: number;
     two: number;
     one: number;
   }
  }
}