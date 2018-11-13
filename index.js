const express = require('express')
const path    = require("path");

const port = 8080
const app = express()

// Vue.js
app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

// Retourne les jours dans un mois
app.get('/day-in-month', (req, res) => {
    console.log(req)
})

app.listen(port, () => {
    console.log(`On ecoute sur le port ${port}`)
})