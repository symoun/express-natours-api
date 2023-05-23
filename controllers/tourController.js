const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Request Body has missing name or price property',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1; //get the last tours id and add 1 to it
  const newTour = Object.assign({ id: newId }, req.body); // create a new tour to be added to the json file

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // console.log(req.body);
  // res.send('Done');
};
exports.getTour = (req, res) => {
  console.log(req.params); // gets the parameters i.e. :id
  const id = req.params.id * 1; // to turn the req.params.id(string) into a number;

  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length)
  // if there is no tour
  /* if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  } */

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  /* if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid',
    });
  } */

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
