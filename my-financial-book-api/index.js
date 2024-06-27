const express = require('express');
const app = express();
const port = 3000
const routeHandler = require('./routes/index')
const cors = require('cors');
const logger = require('./helpers/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello MyFBuddy')
})

app.use('/', routeHandler)

app.listen(port, () => {
    logger.info(`Server listening at port ${port}`)
})