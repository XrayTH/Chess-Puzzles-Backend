const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://XrayTH:${password}@cluster0.2bro94q.mongodb.net/Chess-puzzles?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    firstlvl1: Number,
    firstlvl2: Number,
    firstlvl3: Number,
    firstlvl4: Number,
    firstlvl5: Number,
    bestlvl1: Number,
    bestlvl2: Number,
    bestlvl3: Number,
    bestlvl4: Number,
    bestlvl5: Number,
    total: Number,
    puesto: Number,
    antPuesto: Number
});

const Usuario = mongoose.model('Usuario', userSchema); // Cambiado de Note a Usuario

const usuario = new Usuario({
    user: "Xray",
    password: "password",
    firstlvl1: 100,
    firstlvl2: 100,
    firstlvl3: 100,
    firstlvl4: 100,
    firstlvl5: 100,
    bestlvl1: 100,
    bestlvl2: 100,
    bestlvl3: 100,
    bestlvl4: 100,
    bestlvl5: 100,
    total: 500,
    puesto: 1,
    antPuesto: 2
});

usuario.save().then(result => {
    console.log('usuario saved!');
    mongoose.connection.close();
});

// Este código guardará un nuevo usuario en tu base de datos
