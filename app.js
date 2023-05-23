const express = require('express');
const morgan = require('morgan'); //This is a third party middlware, Log information to the console
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json()); //middleware to store the request into the body
app.use(morgan('dev'));

//MIDDLE WARE
//createing our custom middleware
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next(); //very important otherwise we wil get stuck here in the middleware cycle
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); //very important otherwise we wil get stuck here in the middleware cycle
});

/* app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side');
  res
    .status(404)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send("You can't post to this URL");
}); */

//ROUTE HANDLERS

//ROUTES

app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users', userRouter);
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;
