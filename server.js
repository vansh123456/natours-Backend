const app = require('./app.js'); //app.js ko call karrha hai
//and ab isko run karenge main app.js ki jagah pe to server to main isse hi start hoga na
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});
//connecting to cluster db on mongodb atlas[REQUIRES GLOBAL ACCESS ON ATLAS[0.0.0.0/0]]
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
}).then(() => {
    console.log("Connection to DB successfully established");
})
    //.then(con => {
    //console.log(con.connections);
   //basically mongoose is abstraction layer to make our work easir
   //it works by creating a schema and model layer for the model-schema stuff
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"A tour must have a name"],
        unique: true
    },
    rating: Number,
    price : {
        type: Number,
        required: [true,"A tour must have a price"],
    }
});
const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
    name: 'The biiitch hiker',
    rating: 4.7,
    price: 497
});
//this will save the db in the tours on the server
testTour.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log("ERROOR BSDK!!!")
})

const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`listening on ${port}`);
});