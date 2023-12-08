const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const Usuario = require('./models/usuario');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static('build'));

app.get('/api/usuarios', (request, response) => {
  Usuario.find({}).then(usuarios => {
    response.json(usuarios);
  });
});

app.post('/api/usuarios', (request, response) => {
  const body = request.body;

  // Verifica si alguno de los campos requeridos está ausente en la solicitud
  const requiredFields = [
    'user',
    'password',
    'firstlvl1',
    'firstlvl2',
    'firstlvl3',
    'firstlvl4',
    'firstlvl5',
    'bestlvl1',
    'bestlvl2',
    'bestlvl3',
    'bestlvl4',
    'bestlvl5',
    'total',
    'puesto',
    'antPuesto',
  ];
  
  const missingFields = requiredFields.filter(field => !(field in body));

  if (missingFields.length > 0) {
    return response.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }

  const usuario = new Usuario({
    user: body.user,
    password: body.password,
    firstlvl1: body.firstlvl1,
    firstlvl2: body.firstlvl2,
    firstlvl3: body.firstlvl3,
    firstlvl4: body.firstlvl4,
    firstlvl5: body.firstlvl5,
    bestlvl1: body.bestlvl1,
    bestlvl2: body.bestlvl2,
    bestlvl3: body.bestlvl3,
    bestlvl4: body.bestlvl4,
    bestlvl5: body.bestlvl5,
    total: body.total,
    puesto: body.puesto,
    antPuesto: body.antPuesto,
  });

  usuario.save().then(savedUsuario => {
    response.json(savedUsuario);
  });
});

app.get('/api/usuarios/:id', (request, response, next) => {
  Usuario.findById(request.params.id)
    .then(usuario => {
      if (usuario) {
        response.json(usuario);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/usuarios/:id', (request, response, next) => {
  Usuario.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/usuarios/:id', (request, response, next) => {
  const body = request.body;

  const usuario = new Usuario({
    user: body.user,
    password: body.password,
    firstlvl1: body.firstlvl1,
    firstlvl2: body.firstlvl2,
    firstlvl3: body.firstlvl3,
    firstlvl4: body.firstlvl4,
    firstlvl5: body.firstlvl5,
    bestlvl1: body.bestlvl1,
    bestlvl2: body.bestlvl2,
    bestlvl3: body.bestlvl3,
    bestlvl4: body.bestlvl4,
    bestlvl5: body.bestlvl5,
    total: body.total,
    puesto: body.puesto,
    antPuesto: body.antPuesto,
  });

  Usuario.findByIdAndUpdate(request.params.id, usuario, { new: true })
    .then(updatedUsuario => {
      response.json(updatedUsuario);
    })
    .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
