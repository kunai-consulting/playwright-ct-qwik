import { $, component$, type PropsOf } from '@builder.io/qwik';

type ButtonProps = {
  title: string;
  onHello$: (data: string) => void;
};

export const Button = component$(({ onHello$, title, ...attributes }: ButtonProps) => {
  return (
    <button {...attributes} onClick$={$(() => console.log('clicked'))}>
      {title}
    </button>
  )
})
