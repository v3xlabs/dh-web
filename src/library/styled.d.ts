// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    palette: {
      common: {
        100: string
        200: string
        300: string
        400: string
        500: string
        800: string
      }
      primary: string
      secondary: string
   }
  }
}