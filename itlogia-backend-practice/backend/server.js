const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

app.listen(process.argv[2], () => {
    console.log("Server started on port 3000!");
})