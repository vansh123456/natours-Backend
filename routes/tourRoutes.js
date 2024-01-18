const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController.js');

//router.param('id', tourController.checkID); //=> { //here parameter is the id,and it would run for the id only!
// console.log(`tour id is ${val}`); //here val will hold the value of id
//next();
//});

router
  .route('/') //base home adress ko get karrhe hain humlog tho
  .get(tourController.getallTours) //aaand now all the function calls are coming into the tourController so we do tourcontroller.getallTours and stuff
  .post(tourController.middlewarecheckBody,tourController.createTours); //here is how you chain the middleware,agar middleware wala chala then only  createtour chalega
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

    

module.exports = router;