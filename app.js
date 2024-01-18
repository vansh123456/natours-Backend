const express = require('express');

const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json()); //middleware,stands between request and client,we use '.use' to use middleware
//.get method is the http method that needs to be written ki konsa type ka method chahiye humko
// app.get ('/', (req,res) => {  //.get works as the same as pathname jaise kiya tha pehle req.url
//     // res.status(200).send('hello from the server side!') // we can also send json responses too
//     res.status(200)
//     .json({message: 'hello from the server side' , app: 'natours'}) //.json se apan ko res.writeStaus and request type bhi bhejne ki zarurat nai

// });
// app.post('/', (req, res) => {x
//     res.send('hello from the end side!');
// }); //.post works as the same as .get method
// const tours = fs.readFileSync("./dev-data/data/tours-simple.json","utf-8");
//making our own simple middleware
////////////////////////////////////////////////////////////////
//serving static files!
app.use(express.static(`${__dirname}/public`)); //staic files serves the public directory as the root and usme we can easily open all the files inside it.

app.use((req, res, next) => { //middleware functions have 3 arguments in their function signature
    console.log("Hello from the middleware my man!");
    next(); //for a middleware it is necessary to call next() function tho!
});

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//implementing user routes
// const getallUsers = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message:"route is not yet defined"
//     });
// }
// const createUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message:"route is not yet defined"
//     });
// }
// const getUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message:"route is not yet defined"
//     });
// }
// const updateUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message:"route is not yet defined"
//     });
// }
// const deleteUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message:"route is not yet defined"
//     });
// }


////////////////////////////////////////////////////////////////
// const getallTours = (req,res)=> {  //api/v1/tours is the pathname for the directory
//     res.status(200).json({
//         status: "success", 
//         data: { //data is the property which would contain the data
//             tours:tours //tours const wala tours api(api.get) wale main humlog daalrhe hain
//         }
//     })
// };
// const getTour = (req,res)=> { //here :id is the variable name for the unique id
//     // we will send the unique id via postman!
//     console.log(req.params);  //{ id: '5' } returned in output!
//     const id = req.params.id *1 //multiply string with number makes it the number
//     const tour = tours.find(el => {
//         return (el.id === id);
//     })
//     if(id > tours.length)  {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid ID'
//         });
//     }
//     res.status(200).json({
//         status: "success", 
//          data: { //data is the property which would contain the data
//              tours:tour //tours const wala tours api(api.get) wale main humlog daalrhe hain
//          }
//     })
// };

// const createTours = (req,res) => { //for POST requests the req part should contain some data for that we use middlewares in express!
//     //console.log(req.body);
//     //now woking out to fill the post info into the json file i.e tours-simple.json
//     const newId = tours[tours.length-1].id+1;
//     const newTour = Object.assign({id:newId},req.body); //Object ka O capital main hoga
//     console.log(newTour);

//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour,
//             }
//         })
//     })
// }
// const updateTour = (req,res) => {
//     if(req.params.id *1 > tours.length) {
//         return res.status(404).json({
//             status:'failed',
//             message: 'Invalid id'
//         })
//     }
    
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: 'updated tour here...'
//         }
//     })
// }
// const deleteTour = (req,res) => {
//     if(req.params.id *1 > tours.length) {
//         return res.status(404).json({
//             status:'failed',
//             message: 'Invalid id'
//         })
//     }
//         res.status(204).json({
//             status: 'success',
//             data: {
//                 tour: null
//             }
//         })
// }
//implementling effective routing

//const tourRouter = express.Router(); //tourRouter pe base home address '/api/v1/tours' mount hogyaa
// //userRouter pe base home address '/api/v1/users' mount hogya
//app
// tourRouter
//     .route('/') //base home adress ko get karrhe hain humlog tho
//     .get(getallTours)   
//     .post(createTours);
// tourRouter
//     .route('/:id')
//     .get(getTour)
//     .patch(updateTour)
//     .delete(deleteTour);

//implementing user routing for other users!
// userRouter
// .route(`/`)
// .get(getallUsers)
// .post(createUser);

// app
// .route('/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser);

app.use('/api/v1/tours',tourRouter); //mounting the router,tourRouter pe '/api/v1/tours' mount hogya hai!
app.use('api/v1/users',userRouter);
////////////////////////////////////////////////////////////////
// app.get('/api/v1/tours',getallTours);  //api/v1/tours is the pathname for the directory
//     res.status(200).json({
//         status: "success", 
//         data: { //data is the property which would contain the data
//             tours:tours //tours const wala tours api(api.get) wale main humlog daalrhe hain
//         }
//     })
// });
// app.post('/api/v1/tours',createTours); //for POST requests the req part should contain some data for that we use middlewares in express!
//     //console.log(req.body);
//     //now woking out to fill the post info into the json file i.e tours-simple.json
//     const newId = tours[tours.length-1].id+1;
//     const newTour = Object.assign({id:newId},req.body); //Object ka O capital main hoga
//     console.log(newTour);

//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour,
//             }
//         })
//     })
// })

////////////////////////////////////////////////////////////////
//GETTING A TOUR BASED ON A UNIQUE ID!
// app.get('/api/v1/tours/:id',getTour); //here :id is the variable name for the unique id
//     // we will send the unique id via postman!
//     console.log(req.params);  //{ id: '5' } returned in output!
//     const id = req.params.id *1 //multiply string with number makes it the number
//     const tour = tours.find(el => {
//         return (el.id === id);
//     }) //or we could do req.params*1 jaise upar kiya hai //the callback function el will loop through the whole array
//     ////////////////////////////////
//     //find() function returns the first value it finds in an array for a given condition
//     // === is strictly equality checker,checks value and data member too
//     // el is running a callback function
//     ////////////////////////////////////////////////////////////////

//     if(id > tours.length)  {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid ID'
//         });
//     }
//     res.status(200).json({
//         status: "success", 
//          data: { //data is the property which would contain the data
//              tours:tour //tours const wala tours api(api.get) wale main humlog daalrhe hain
//          }
//     })
// });
// app.patch(`/api/v1/tours/:id`, updateTour);
//     if(req.params.id *1 > tours.length) {
//         return res.status(404).json({
//             status:'failed',
//             message: 'Invalid id'
//         })
//     }
    
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: 'updated tour here...'
//         }
//     })
// })

// app.delete(`/api/v1/tours/:id` ,deleteTour);
//     if(req.params.id *1 > tours.length) {
//         return res.status(404).json({
//             status:'failed',
//             message: 'Invalid id'
//         })
//     }
//         res.status(204).json({
//             status: 'success',
//             data: {
//                 tour: null
//             }
//         })
// })

module.exports = app;
// const port = 3000;
// app.listen(port , () => {
//     console.log(`listening on ${port}`);
// });
