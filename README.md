# blop-vite-react

A Vite + React + TypeScript app that uses [blop](https://github.com/sethdavis512/blop) to generate its components and hooks.

```bash
bun install
bun dev
```

## Generators

`blop.config.ts` defines two generators:

| Generator | Writes |
| --- | --- |
| `component` | `src/components/<Name>/<Name>.tsx`, an optional `<Name>.css`, an `index.ts`, and a line in `src/components/index.ts` |
| `hook` | `src/hooks/use<Name>.ts` and a line in `src/hooks/index.ts` |

```bash
bun blop                                          # pick a generator and answer its prompts
bun blop component --name "feature card" --dry-run
bun blop component --name badge --no-css
bun blop hook --name toggle
```

`FeatureCard`, `Badge` and `useToggle` in `src` were made with those commands, and `src/App.tsx` uses them.
