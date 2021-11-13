import app from './app';

app.listen(process.env.PORT, () => {
    console.log(`HTTP server listening on port ${process.env.PORT}`);
});
