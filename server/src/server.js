const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const MongoStore = require('connect-mongo');
// Mongoose
require('./config/mongodb.config')();
const { error } = require('./middleware/error.middleware');
// socket
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
global._io = io;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setup session
app.use(
  session({
    secret: 'e commerce',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://learncode:learncode203@learncode.dmuqeok.mongodb.net/test-e-com?retryWrites=true&w=majority',
    }),
  })
);
app.use('/api', require('./router/index'));
// Server frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

io.on('connection', require('./services/socket.service'));

app.use(error);

server.listen(process.env.PORT || 5000, () => console.log(`Server is connecting`));
