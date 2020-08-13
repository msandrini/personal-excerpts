const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const app = express()

app.use(serveStatic(path.resolve(__dirname, 'dist')))
const port = 5000
app.listen(port)
console.log('server started ' + port)