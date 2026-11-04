import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = Number(process.env.PORT ?? 4000)
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
