const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

// // middleware1
// app.use(function(req,res,next){
//     console.log('middleware1 called');
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
//     console.log('middleware2 called');
//     next();
// });

app.use(express.static('assets'));

var contactList = [
    {
        name: "Abhishek",
        phone: "1234567890"
    },
    {
        name : "Chris Pratt",
        phone : "111111111"
    },
    {
        name: "Virat Kohli",
        phone : "4444444444"
    }

]

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){console.log('error in fetching contacts from db');
        return;}
    return res.render('home',{
        title: "My contact list",
        contact_list : contacts
    });
});
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error in creating a contact');
        return;}

        console.log('******', newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact',function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
    })
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }
    console.log('working express on port', port);
});