'use client';
import {FC, MouseEventHandler, PropsWithChildren} from 'react';
import {cva, VariantProps} from 'class-variance-authority';
import styles from './button.module.scss';

type ButtonProps = {
  intent: 'primary' | 'secondary';
  size: 'small' | 'medium';
  onClick: MouseEventHandler<HTMLButtonElement>;
} & VariantProps<typeof button>

const button = cva(styles.base, {
  variants: {
    intent: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

export const Button: FC<PropsWithChildren<ButtonProps>> = ({size, intent, onClick, children}) => {
  return (
    <button onClick={onClick} className={button({size, intent})}>{children}</button>
  );
};