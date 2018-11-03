var express = require('express');
require('typescript');
require('@tensorflow/tfjs');
require('@tensorflow-models/mobilenet');



var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


require('data-tree');
usersMap = {};
itemsMap = {};

class Item{
    constructor(name, ownerid, agreement, maxusagers, pictureUrl, location, category){
        this.name = name;
        this.rating = null;
        this.ratingsNo = 0;
        this.ownerid = ownerid;
        this.usagersid = {};
        this.maxusagers = maxusagers;
        this.agreement = agreement;
        this.pictureUrl = pictureUrl;
        this.location = location;
        this.category = category;
        key = itemsMap.keys().length;
        itemsMap[key] = this;
    }

    claim_item(itemid, usagerid, agrementAgreed){
        item = itemsMap[itemid];
        if (Object.keys(item.isagersid) < item.maxusagers){
            //add to list who can use this sharing
            item.maxusagers++;
            item.isagersid[itemid] = 1;
        } else {
            //add to waiting list
            item.isagersid[itemid] = 0;
        }
    }

    rate_the_item(idfrom, idto, iditem, rating){
        //todo influence of agreement
        if (idto in item.usagersid){
            ratingsNo = itemsMap[iditem].ratingsNo;
            itemsMap[iditem].ratingsNo++;
            if (ratingsNo == 0){
                itemsMap[iditem].rating = rating;
            } else{
                itemsMap[iditem].rating = (itemsMap[iditem].rating + rating)/ itemsMap[iditem].ratingsNo;
            }
        }
    }
}


class User{

    constructor(name, familyname, email, phone, password, id, location) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.rating = null;
        this.location = location;
        this.password = password;
        this.ratingsNo = 0;
        this.familyname = familyname;
        usersMap[id]=this;
    }

    update_location(location, userid){
        usersMap[userid].location = location;
    }

    rate_the_usager(idfrom, idto, iditem, rating){
        //todo influence of agreement
        item = itemsMap[iditem];

        if (idto in item.usagersid){
            userRatingsNo = usersMap[idto].ratingsNo;
            usersMap[idto].ratingsNo++;
            if (userRatingNo == 0){
                usersMap[idto].rating = rating;
            } else{
                usersMap[idto].rating = (usersMap[idto].rating + rating)/ usersMap[idto].ratingsNo;
            }
        }
    }

    rate_the_owner(idfrom, idto, iditem, rating){
        //todo influence of agreement
        if (idto in item.usagersid){
            rate_the_item(idfrom, idto, iditem, rating);
            userRatingsNo = usersMap[idfrom].ratingsNo;
            usersMap[idfrom].ratingsNo++;
            if (userRatingNo == 0){
                usersMap[idfrom].rating = rating;
            } else{
                usersMap[idfrom].rating = (usersMap[idfrom].rating + rating)/ usersMap[idfrom].ratingsNo;
            }
        }
    }

}

categoriesTree = dataTree.create();

class Categories{
    constructor(){
        categoriesTree.insert("games");
        categoriesTree.insert("electronics");
        categoriesTree.insert("vehicle");
        categoriesTree.insert("clothes");
        categoriesTree.insert("camp tent");
        categoriesTree.insert("bicycle");
        categoriesTree.insert("food");
        categoriesTree.insert("tools");
    }

    add(category){
        categoriesTree.insert(category);
    }

}



async function read () {

    try {
        const img = document.getElementById('img').src('Cat03.jpg');


    // Load the model.
        const model = await mobilenet.load();

    // Classify the image.
        const predictions = await model.classify(img);

        console.log('Predictions: ');
        console.log(predictions);
    } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
    }
}


/*
*/