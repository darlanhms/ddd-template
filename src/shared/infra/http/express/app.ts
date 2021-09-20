import express from 'express';
import cors from 'cors';
import router from './routes';
import contexts from './contexts';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use(async (req, res, next) => {
    contexts(() => next());
});

app.use('/api', router);

app.get('/', (req, res) => {
    return res.send(new Date());
});

export default app;
