export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps): JSX.Element {
  return (
    <button type="button" {...other} onClick={() => console.log('Oi')}>
      {children}
    </button>
  );
}

Button.displayName = "Button";
