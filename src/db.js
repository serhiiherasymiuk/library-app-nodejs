const mongoose = require('mongoose');
const {ServerApiVersion} = require("mongodb");

// Підключення до MongoDB через mongoose
const uri = "mongodb+srv://sgerasimuk07:iIiTLjpf8Chy7uxN@cluster0.jr0y54t.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0\n";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;
