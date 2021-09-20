import app from './app';
// import apolloServer from '../apollo/server';

// apolloServer(app);

app.listen(process.env.PORT, () => {
    console.log(`HTTP server listening on port ${process.env.PORT}`);
});
