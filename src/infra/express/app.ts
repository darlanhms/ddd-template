import express from 'express';
import cors from 'cors';
import apolloServer from '@infra/apollo/server';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => {
    res.json(new Date());
});

apolloServer(app);

export default app;
