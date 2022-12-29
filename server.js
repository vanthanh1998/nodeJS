const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Yowai mo!')
})

app.get('/about', (req, res) => {
    res.send(`I'm thanhrain`)
  })

app.listen(port, () => {
  console.log(`Thanhrain port ${port}`)
})