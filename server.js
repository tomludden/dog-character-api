import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json())

const dogs = JSON.parse(fs.readFileSync('./dogs.json', 'utf-8'))

app.get('/', (req, res) => {
  res.send('Dog Character API is running')
})

app.get('/api/dogs', (req, res) => {
  res.json(dogs)
})

app.get('/api/dogs/:id', (req, res) => {
  const dog = dogs.find((d) => d.id === Number(req.params.id))
  if (!dog) return res.status(404).json({ error: 'Dog not found' })
  res.json(dog)
})

app.get('/api/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || ''
  const results = dogs.filter((d) => d.name.toLowerCase().includes(q))
  res.json(results)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
