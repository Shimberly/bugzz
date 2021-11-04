import express from 'express';
import Path from 'path';

const app = express()
//app.use(express.static(Path.resolve('/')));

app.use(express.static('public')); //hace que puedas acceder desde el index a rutas estaticas :(

app.get('/', function (req, res) {
    res.sendFile(Path.resolve('index.html'));
});

app.listen(8080, () => {
    console.log('Server listening on http://localhost:8080');
});