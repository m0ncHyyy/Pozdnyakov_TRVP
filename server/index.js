const express = require('express');
const cors = require('cors');
const specialistRouter = require('./routes/specialist.routes');
const sobesRouter = require('./routes/sobes.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.disable('etag');
app.use(express.json());
app.use('/api', specialistRouter);
app.use('/api', sobesRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
