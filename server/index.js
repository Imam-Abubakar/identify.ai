const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const socket = require('socket.io');
const port = process.env.PORT || 5000;

app.use(cookieParser());

dotenv.config({ path: __dirname + '/.env' });

require('./db/connection.js');

app.use(cors());
app.use(express.json());
app.use(
    fileUpload({
      useTempFiles: true,
    })
  );

app.use(require('./router/auth.js'));

app.get('/', (req, res) => {
    res.send('running');
})


const server = app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


// establishing socket.io connection

const io = socket(server, {
    cors: {
        origin: "*",
    }
});


