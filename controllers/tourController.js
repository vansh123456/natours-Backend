
const fs = require('fs');
const Tour = require('./../models/tourModel.js');
//below was for when we werent fetching from the Atlas DB!
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkID = (req,res,next,val) => {
//     if(req.params.id *1 > tours.length) {
//         return res.status(404).json({
//             status:'failed', 
//             message: 'Invalid id'
//         })
//     }
//     next(); //taaki pipeline is maintained!
// };
exports.middlewarecheckBody = (req, res, next) => {
    if(!req.body.name || req.body.price)
    return res.status(400).json({
        status: 'fail',
        message: 'missing name or price'
    }) 
    next();
}

exports.getallTours = (req,res)=> {  //api/v1/tours is the pathname for the directory
    res.status(200).json({
        status: "success", 
        // data: { //data is the property which would contain the data
        //     tours:tours //tours const wala tours api(api.get) wale main humlog daalrhe hain
        // }
    })
};
exports.getTour = (req,res)=> { //here :id is the variable name for the unique id
    // we will send the unique id via postman!
    console.log(req.params);  //{ id: '5' } returned in output!
    const id = req.params.id *1 //multiply string with number makes it the number
    // const tour = tours.find(el => {
    //     return (el.id === id);
    // })
    // // if(id > tours.length)  {
    // //     return res.status(404).json({
    // //         status: 'fail',
    // //         message: 'invalid ID'
    // //     });
    // // }
    // res.status(200).json({
    //     status: "success", 
    //      data: { //data is the property which would contain the data
    //          tours:tour //tours const wala tours api(api.get) wale main humlog daalrhe hain
    //      }
    // })
};

exports.createTours = (req,res) => { //for POST requests the req part should contain some data for that we use middlewares in express!
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        }
    })
};
exports.updateTour = (req,res) => {
    // if(req.params.id *1 > tours.length) {
    //     return res.status(404).json({
    //         status:'failed',
    //         message: 'Invalid id'
    //     })
    // }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'updated tour here...'
        }
    })
}
exports.deleteTour = (req,res) => {
    
        res.status(204).json({
            status: 'success',
            data: {
                tour: null
            }
        })
}