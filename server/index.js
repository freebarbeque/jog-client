const path = require('path')
const express = require('express')

const app = express()
const indexPath = path.join(__dirname, '/../dist/index.html')
const staticPath = path.join(__dirname, '/../dist')

app.use(express.static(staticPath));
app.get('*', function (_, res) {
    res.sendFile(indexPath)
})

app.listen(process.env.PORT || 8080);

console.log(`Started at ${process.env.PORT || 8080}`)
