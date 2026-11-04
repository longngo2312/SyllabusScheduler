import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [status, setStatus] = useState('unknown')

  async function checkApi() {
    try {
      const res = await fetch('/api/health')
      setStatus(res.ok ? (await res.json()).status : `error ${res.status}`)
    } catch {
      setStatus('unreachable')
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Syllabus Scheduler</h1>
      <Button onClick={checkApi}>Check API</Button>
      <p className="text-muted-foreground">API: {status}</p>
    </main>
  )
}

export default App
