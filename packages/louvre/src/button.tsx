import { ComponentProps, ElementType } from 'react'
import { styled } from '../styles'

export const Button = styled('button', {
  all: 'unset',
  borderRadius: '$md',
  fontSize: '$lg',
  fontWeight: '$medium',
  fontFamily: '$default',
  textAlign: 'center',
  boxSizing: 'border-box',
  width: '100%',
  transition: "all 0.2s",

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$3',

  cursor: 'pointer',

  svg: {
    width: '$5',
    height: '$5',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  variants: {
    variant: {
      primary: {
        color: '$white',
        background: '$orange500',

        '&:not(:disabled):hover': {
          background: '$orange600'
        },

        '&:disabled': {
          backgroundColor: '$gray400',
        },
      },

      secondary: {
        color: '$blue500',
        background: '$blue50',

        '&:not(:disabled):hover': {
          background: '$blue100'
        },

        '&:disabled': {
          color: '$white',
          backgroundColor: '$gray400',
        },
      },

      tertiary: {
        color: '$white',
        background: '$blue500',

        '&:not(:disabled):hover': {
          background: '$blue800'
        },

        '&:disabled': {
          color: '$white',
          backgroundColor: '$blue100',
        },
      },

      action: {
        color: '$white',
        background: '$green500',

        '&:not(:disabled):hover': {
          background: '$green600'
        },

        '&:disabled': {
          color: '$white',
          backgroundColor: '$gray400',
        },
      }
    },

    size: {
      sm: {
        padding: '$2'
      },
      md: {
        padding: '$3 $8',

      },
      lg: {
        padding: '$6 $14',
      }
    }

  },

  defaultVariants: {
    variant: 'primary',
  },
})

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

Button.displayName = 'Button'