import app from "./app";
const PORT = 3000;
const ENV = process.env.NODE_ENV || 'production';

app.listen(PORT, () => {
    console.log( 'Server listening on port ' + PORT + '\nMode: ' + ENV);
});
