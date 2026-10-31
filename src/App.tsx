import { Badge, FeatureCard } from './components'
import { useToggle } from './hooks'
import './App.css'

const commands = [
  {
    title: 'FeatureCard',
    command: 'bun blop component --name "feature card"',
    note: 'Component, CSS file, index.ts, and a line in the components barrel.',
  },
  {
    title: 'Badge',
    command: 'bun blop component --name badge --no-css',
    note: 'Same generator, with the CSS prompt answered by a flag.',
  },
  {
    title: 'useToggle',
    command: 'bun blop hook --name toggle',
    note: 'A hook in src/hooks, added to the hooks barrel.',
  },
]

function App() {
  const { value: showCode, setValue: setShowCode } = useToggle(true)

  return (
    <main className="app">
      <h1>blop + Vite + React</h1>
      <p>
        The components and hook on this page were scaffolded by the generators in{' '}
        <code>blop.config.ts</code>.
      </p>

      <button type="button" onClick={() => setShowCode(!showCode)}>
        {showCode ? 'Hide' : 'Show'} commands
      </button>

      <div className="grid">
        {commands.map(({ title, command, note }) => (
          <FeatureCard key={title}>
            <h2>
              {title} <Badge className="badge">generated</Badge>
            </h2>
            <p>{note}</p>
            {showCode && <code>{command}</code>}
          </FeatureCard>
        ))}
      </div>
    </main>
  )
}

export default App
