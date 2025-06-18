# 🎭 Playwright Qwik component testing

> **Note**
> The API has been designed to closely resemble Playwright's API wherever applicable. This library is _(without guarantee)_ aimed at facilitating a smooth transition to Playwright once it offers official support for Qwik components. It is important to take into account that this library will reach end of life when Playwright has official support for Qwik component testing.
>
> This library is based on the excellent work by [@sand4rt](https://github.com/sand4rt) for Solid component testing. To push for official support, feedback in the form of GitHub issues and or stars is appreciated!

## Capabilities

- Run tests fast, in parallel and optionally over multiple machines with [sharding](https://playwright.dev/docs/test-sharding) or [Azure's Testing Service](https://www.youtube.com/watch?v=FvyYC2pxL_8).
- Run the test headless or headed accross multiple _real_ desktop and/or mobile browser engines.
- Full support for shadow DOM, multiple origins, (i)frames, browser tabs and contexts.
- Minimizes flakyness, due to auto waiting, web first assertions and ensures that every test runs in [full isolation](https://playwright.dev/docs/browser-contexts).
- Advanced [emulation capabilities](https://playwright.dev/docs/emulation) such as modifying screen size, geolocation, color scheme and [the network](https://playwright.dev/docs/mock-browser-apis).
- Interactions with the components are indistinguishable from real user behavior.
- [Visual regression / screenshot testing](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1).
- Zero-configuration TypeScript support.

Along with all these ✨ awesome capabilities ✨ that come with Playwright, you will also get:

- [Watch mode _(BETA)_](https://github.com/microsoft/playwright/issues/21960#issuecomment-1483604692).
- [Visual Studio Code intergration](https://playwright.dev/docs/getting-started-vscode).
- [UI mode](https://playwright.dev/docs/test-ui-mode) for debuging tests with a time travel experience complete with watch mode.
- [Playwright Tracing](https://playwright.dev/docs/trace-viewer-intro) for post-mortem debugging in CI.
- [Playwright Test Code generation](https://playwright.dev/docs/codegen-intro) to record and generate tests suites.

## Usage

Initialize Playwright Qwik component testing with PNPM, NPM or Yarn and follow the installation steps:
