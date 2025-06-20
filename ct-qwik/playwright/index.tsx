import { beforeMount, afterMount } from '@kunai-consulting/experimental-ct-qwik/hooks';

export type HooksConfig = {
  route?: string;
  routing?: boolean;
}

beforeMount<HooksConfig>(async ({ hooksConfig, App }) => {
  console.log(`Before mount: ${JSON.stringify(hooksConfig)}`);

  // return <App />
});

afterMount<HooksConfig>(async () => {
  console.log(`After mount`);
});
