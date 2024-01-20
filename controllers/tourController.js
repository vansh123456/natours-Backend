
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
//mongoose model will take care of it now!
// exports.middlewarecheckBody = (req, res, next) => {
//     if(!req.body.name || req.body.price)
//     return res.status(400).json({
//         status: 'fail',
//         message: 'missing name or price'
//     }) 
//     next();
// }

exports.getallTours = async (req,res)=> {  //api/v1/tours is the pathname for the directory
    try {
    const tours = await Tour.find();
    //.find when not given any param,shows all the available tours
    res.status(200).json({
        status: "success", 
        result: tours.length,
         data: { //data is the property which would contain the data
             tours:tours //tours const wala tours api(api.get) wale main humlog daalrhe hain
         }
    })
  }
  catch(err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
  }
};
exports.getTour = async (req,res)=> {
    try{
        await Tour.findById(req.params.id);
        //Tour.findOne({_id: req.params.id}) this is what mongoose does on the backside!
    }
    catch(err){
        res.status(404).json({
        status:'fail',
        message : err    
        })
    }
    //here :id is the variable name for the unique id
    // we will send the unique id via postman!
    //console.log(req.params);  //{ id: '5' } returned in output!
    //const id = req.params.id *1 //multiply string with number makes it the number
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

exports.createTours = async (req,res) => { //for POST requests the req part should contain some data for that we use middlewares in express!
    try{
    //const newTour = new Tour({});
    //newTour.save(); //long way of saving,making a new document and saving on that

    const newTour = await Tour.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        }
    })
  }
  catch(err) {
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent' //err
    })
  }
};
exports.updateTour = async (req,res) => {
    // if(req.params.id *1 > tours.length) {
    //     return res.status(404).json({
    //         status:'failed',
    //         message: 'Invalid id'
    //     })
    // }
    try {
        await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour: 'updated tour here...'
            }
        })
        }   
        catch(err){
            res.status(404).json({
                status: 'fail',
                message: err
            })
        }
    }
    
exports.deleteTour = async (req,res) => {
    
    try{
        await Tour.findOneAndDelete(req.params.id) //in RESTfull API,practice is to not send any data to client when delete operation is called.
        res.status(204).json({
            status: 'success',
            data: {
                tour: 'Tour has been deleted'
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}