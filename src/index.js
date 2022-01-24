/* Basic libraries calls. */
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
/* App configuration. */
const app = express();
app.use(express.json());
/* Defining schema. */
const { Schema } = mongoose;
/* Connecting to database. */
const port = 4000;
const url = process.env.MONGO_URI;
mongoose.connect(url);
const connection = mongoose.connection;
connection.once("open",() => {
    console.log("mongoDB database connection established successfully.");
});
/* Using  mongoose basic schema to create a person prototype. */
const Person = new mongoose.Schema({
    name: {type: String,
           required: true},
    age: Number,
    favouriteFoods: [String],
});
/* Creating and saving a record of a model. */
const person = mongoose.model('person',Person);
const Ahmed = new person({name: 'Ahmed', age: 22,favouriteFoods: ['pizza','fried shrimp']});
Ahmed._id = 1;
 Ahmed.save((err,data) => {
    console.log(Ahmed,'Ahmed successfully added');
})
/* Creating several people with Model.create(), using the function argument arrayOfPeople. */
let arrayOfPeople = [
{name: 'Fatma', age: 24,favouriteFoods: ['rice','cheese']},
{name: 'Mahmoud', age: 26,favouriteFoods: ['steak','wine','burritos','burrito']},
{name: 'hanen', age: 24,favouriteFoods: ['shawarma','corn']}
];
 person.create(arrayOfPeople, (err,data) => {
if (err) throw err;
console.log(data);
});
/* Creating Many Records with model.create(). */
person.create({name: 'Insaf', age: 21,favouriteFoods: ['shawarma','corn','burritos','burrito']},{name: 'Said', age: 21,favouriteFoods: ['pizza','burritos','burrito']});
person.create({name: 'Mary', age: 25,favouriteFoods: ['steak','wine','burritos','burrito']});
/* Displaying all persons in the database. */
person.find({}, (err, data)=> {
if (err) throw err ;
console.log(data)
 });
/* Searching list of persons by a favourite food. */
 person.findOne({favouriteFoods: {$all : ['steak']}}, (err, data)=> {
    if (err) throw err ;
    console.log("The person that likes steak was found")
    console.log(data)
     });
/* Searching list of persons by Id. */
 person.findById({_id: ("61ebd9e8b87cc99acc778c52")}, (err, data)=> {
        if (err) throw err ;
        console.log(data)
         });
/* Performing Classic Updates by Running Find, Edit, then Save. */   
 person.findOneAndUpdate({_id: ("61ebd9e8b87cc99acc778c52")}, (err, data)=> {
            if (err) throw err ;
            data.favouriteFoods.push("hamburger");
            data.save((err, record) => {
            console.log(record)})
             });
/* Performing New Updates on a Document Using model.findOneAndUpdate(). */
person.findOneAndUpdate({name:"Fatma"}, {$set:{age: 20}}, {new: true}, (err, data)=> {
                if (err) throw err ;
                console.log(data)
               
                 });  
/* Removing a person by his/her Id. */                 
person.findByIdAndRemove({_id: ("61ed9b433d243696c9b4f74a")}, (err, data)=> {
                    if (err) throw err ;
                    console.log('The person with Id target was removed')
                    console.log(data)
                     });
/* Removing a person by his name. */ 
person.findOneAndRemove({name: 'Ahmed'}, (err, data)=> {
                        if (err) throw err ;
                        console.log('The person with name target was removed')
                        console.log(data)
                         });
/* Removing a person by his/her Id using the method findOneAndRemove. */
person.findOneAndRemove({_id: ("61edc8122c75acc7950a7ef5")}, (err, data)=> {
                            if (err) throw err ;
                            console.log('The person with Id target was removed')
                            console.log(data)
                        });  
/* Removing a person under a certain condition. */ 
person.remove({age:24}, (err, data)=> {
                                if (err) throw err ;
                                console.log('The persons removed are')
                                console.log(data)
                                 }); 
/* Removing everyone with the name 'Mary' . */  
person.remove({name:'Mary'}, (err, data)=> {
                                    if (err) throw err ;
                                    console.log('The person with the name Mary was removed from the database')
                                    console.log(data)
                                     });
/* Chaining Search Query Helpers to Narrow Search Results.  */
  var foodToSearch  = "burrito"  ;
  person.find({favouriteFoods : {$all: [foodToSearch]}})
  .sort({name: 'asc'}) 
  .limit(2)   
  .select('-age')   
  .exec((err,data) => {
      if (err) throw err;
      console.log('list of sorted person')
      console.log(data)
  });               
/* Connecting localhost server to listen on port 4000 . */
 app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});