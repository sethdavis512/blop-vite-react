import { add, append, camel, code, confirm, defineConfig, generator, kebab, pascal, text, words } from 'blop';

// Templates are plain functions that return a `code` template.

const componentFile = (Name: string, className: string, css: boolean) => code`
    import type { ComponentPropsWithoutRef } from 'react';
    ${css && `import './${Name}.css';`}

    type ${Name}Props = ComponentPropsWithoutRef<'div'>;

    export function ${Name}({ className, ...props }: ${Name}Props) {
        return <div className={['${className}', className].filter(Boolean).join(' ')} {...props} />;
    }
`;

const cssFile = (className: string) => code`
    .${className} {
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: 8px;
    }
`;

const hookFile = (hookName: string) => code`
    import { useState } from 'react';

    export function ${hookName}<T>(initial: T) {
        const [value, setValue] = useState(initial);
        return { value, setValue };
    }
`;

export default defineConfig({
    component: generator({
        description: 'A React component in src/components, added to the barrel',
        // Each prompt is also a flag: --name, --css / --no-css.
        prompts: {
            name: text('Component name'),
            css: confirm('Add a CSS file?', { default: true }),
        },
        actions: ({ name, css }) => {
            const Name = pascal(name);
            const dir = `src/components/${Name}`;
            return [
                add(`${dir}/${Name}.tsx`, componentFile(Name, kebab(name), css)),
                css && add(`${dir}/${Name}.css`, cssFile(kebab(name))),
                add(`${dir}/index.ts`, `export * from './${Name}';\n`),
                // Add this component to the barrel, creating it if it's missing.
                append('src/components/index.ts', `export * from './${Name}';`, { create: true }),
            ];
        },
    }),

    hook: generator({
        description: 'A React hook in src/hooks, added to the barrel',
        prompts: {
            name: text('Hook name, like window size'),
        },
        actions: ({ name }) => {
            const hookName = camel(words(name)[0] === 'use' ? name : `use ${name}`);
            return [
                add(`src/hooks/${hookName}.ts`, hookFile(hookName)),
                append('src/hooks/index.ts', `export * from './${hookName}';`, { create: true }),
            ];
        },
    }),
});
