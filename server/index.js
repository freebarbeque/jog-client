const path = require('path');
const express = require('express');

const app = express();
const indexPath = path.join(__dirname, '/../dist/index.html');
const staticPath = path.join(__dirname, '/../dist');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

app.use(express.static(staticPath));
app.get('*', function(_, res) {
    res.sendFile(indexPath);
});

app.listen(port, host, function() {
    console.log(`Express server started at ${port}`);
});
