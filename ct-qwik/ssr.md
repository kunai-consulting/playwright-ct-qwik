# Qwik SSR Component Testing

## Overview

Qwik SSR component testing uses server-side rendering to ensure components work correctly with Qwik's resumability model. Components are rendered on the server first, then mounted in the browser for testing.

## Current Implementation

### File Structure
```
ct-qwik/
├── tests/
│   └── callbacks.spec.tsx    # Component tests
├── src/
│   └── components/
│       └── button.tsx        # Qwik components
├── playwright.config.ts      # Playwright configuration
└── vite.config.ts           # Vite configuration
```

### Test Example
```typescript
import { test, expect } from "@kunai-consulting/experimental-ct-qwik";
import { Button } from "@/components/button";

test("execute callback when the button is clicked", async ({ mount }) => {
  const messages: string[] = [];
  const component = await mount(
    <Button
      title="Submit"
      onClick={(data) => {
        messages.push(data);
      }}
    />,
  );
  await component.click();
  expect(messages).toEqual(["hello"]);
});
```

### Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

## How It Works

1. **Server Setup**: Qwik dev server runs on localhost:5173
2. **Component SSR**: Components are rendered server-side using `renderToString`
3. **Browser Mount**: SSR'd HTML is injected into test page
4. **Test Execution**: Tests run against the mounted component
5. **Cleanup**: Component is unmounted after test

## Key Features

- **SSR Testing**: Components are tested with server-side rendering
- **Resumability**: Ensures Qwik's resumability works correctly
- **QRL Testing**: QRLs are properly serialized and tested
- **Standard Playwright**: Uses standard Playwright testing patterns

## Benefits

- Tests components in their actual SSR environment
- Verifies Qwik's resumability model
- Ensures proper QRL serialization
- Maintains standard Playwright testing workflow
