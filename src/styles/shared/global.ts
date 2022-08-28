import { createGlobalStyle, ThemeProps } from 'styled-components'

export interface GlobalProps {
  theme: ThemeProps<unknown>
}

export default createGlobalStyle<GlobalProps>`
    *{
        margin: 0;
        box-sizing: border-box;
    }

    #root{
        margin: 0;
        padding: 0;
    }

    body{
		font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: 400;
		color: #233D4d;
		margin: 0;
		padding: 0;
    }

    img{
        max-width: 100%;
    }
`
