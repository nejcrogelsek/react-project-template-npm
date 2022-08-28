import styled from 'styled-components'

const media = {
  xs: (styles: string) => `
		@media only screen and (min-width: 0) {
			${styles}
		}
	`,
  sm: (styles: string) => `
		@media only screen and (min-width: 480) {
			${styles}
		}
	`,
  md: (styles: string) => `
		@media only screen and (min-width: 720) {
			${styles}
		}
	`,
  lg: (styles: string) => `
		@media only screen and (min-width: 960) {
			${styles}
		}
	`,
  xl: (styles: string) => `
		@media only screen and (min-width: 1200) {
			${styles}
		}
	`,
}

export interface BaseProps {
  margin?: {
    left?: string
    right?: string
    top?: string
    bottom?: string
  }
}

export interface RowProps extends BaseProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?: 'center' | 'space-between' | 'flex-start' | 'flex-end'
}

export interface ColProps extends BaseProps {
  size: number | string
  collapse?: string
}

export const Grid = styled.div``
export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${(p) => (p.direction ? p.direction : 'row')};
  justify-content: ${(p) => (p.justifyContent ? p.justifyContent : 'flex-start')};
  ${(p) => p.margin?.top && `margin-top: ${p.margin.top}`}
  ${(p) => p.margin?.left && `margin-left: ${p.margin.left}`}
	${(p) => p.margin?.right && `margin-right: ${p.margin.right}`}
	${(p) => p.margin?.bottom && `margin-bottom: ${p.margin.bottom}`}
`
export const Col = styled.div<ColProps>`
  display: ${(p) => (p.size === 'contents' ? 'contents' : 'auto')};
  flex: ${(p) => p.size};
  ${(p) => p.margin?.top && `margin-top: ${p.margin.top}`}
  ${(p) => p.margin?.left && `margin-left: ${p.margin.left}`}
	${(p) => p.margin?.right && `margin-right: ${p.margin.right}`}
	${(p) => p.margin?.bottom && `margin-bottom: ${p.margin.bottom}`}
  ${(p) =>
    p.collapse &&
    media[p.collapse as keyof typeof media](`
		display: none;
	`)}
`
