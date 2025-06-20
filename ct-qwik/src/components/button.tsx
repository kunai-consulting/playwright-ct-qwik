import { component$, type PropFunction, type PropsOf } from '@builder.io/qwik';

type ButtonProps = {
  title: string;
  onClick: (data: string) => void;
} & PropsOf<'button'>;

export const Button = component$(({ onClick, title, ...attributes }: ButtonProps) => {
  return (
    <button {...attributes} onClick$={() => onClick?.('hello')}>
      {title}
    </button>
  )
})
