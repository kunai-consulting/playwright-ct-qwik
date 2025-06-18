import type { PropFunction, PropsOf } from '@builder.io/qwik';

type ButtonProps = {
  title: string;
  onClick: PropFunction<(arg0: string) => void>;
} & PropsOf<'button'>;

export function Button({ onClick, title, ...attributes }: ButtonProps) {
  return <button {...attributes} onClick$={() => onClick?.('hello')}>
    {title}
  </button>
}
