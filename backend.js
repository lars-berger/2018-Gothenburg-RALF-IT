
const tf = require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet');
require('@tensorflow/tfjs-node')

const fs = require('fs');
const jpeg = require('jpeg-js');

const NUMBER_OF_CHANNELS = 3


const readImage = path => {
    const buf = fs.readFileSync(path)
    const pixels = jpeg.decode(buf, true)
    return pixels
}

const imageByteArray = (image, numChannels) => {
    const pixels = image.data
    const numPixels = image.width * image.height;
    const values = new Int32Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] = pixels[i * 4 + channel];
        }
    }

    return values
}

const imageToInput = (image, numChannels) => {
    const values = imageByteArray(image, numChannels)
    const outShape = [image.height, image.width, numChannels];
    const input = tf.tensor3d(values, outShape, 'int32');

    return input
}

const loadModel = async path => {
    const mn = new mobilenet.MobileNet(1, 1);
    mn.path = `file://${path}`
    await mn.load()
    return mn
}

const classify = async (model, path) => {
    const image = readImage(path)
    const input = imageToInput(image, NUMBER_OF_CHANNELS)

    const mn_model = await loadModel(model)
    const predictions = await mn_model.classify(input)

    //console.log('classification results:', predictions)

    return predictions;
}


usersMap = {};
itemsMap = {};

class Item {
    constructor(name, ownerid, agreement, maxusagers, location, imgName) {
        this.name = name;
        this.rating = null;
        this.ratingsNo = 0;
        this.ownerid = ownerid;
        this.usagersid = {};
        this.maxusagers = maxusagers;
        this.agreement = agreement;
        this.imgName = imgName;
        this.location = location;

        //this.category = category;
        itemsMap[Object.keys(itemsMap).length] = this;


    }

    claim_item(itemid, usagerid, agrementAgreed) {
        var item = itemsMap[itemid];
        if (Object.keys(item.isagersid) < item.maxusagers) {
            //add to list who can use this sharing
            item.maxusagers++;
            item.isagersid[itemid] = 1;
        } else {
            //add to waiting list
            item.isagersid[itemid] = 0;
        }
    }

    rate_the_item(idfrom, idto, iditem, rating) {
        //todo influence of agreement
        if (idto in item.usagersid) {
            var ratingsNo = itemsMap[iditem].ratingsNo;
            var itemsMap[iditem].ratingsNo++;
            if (ratingsNo == 0) {
                itemsMap[iditem].rating = rating;
            } else {
                itemsMap[iditem].rating = (itemsMap[iditem].rating + rating) / itemsMap[iditem].ratingsNo;
            }
        }
    }
}


class User {

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
        usersMap[id] = this;
    }

    update_location(location, userid) {
        usersMap[userid].location = location;
    }

    rate_the_usager(idfrom, idto, iditem, rating) {
        //todo influence of agreement
        item = itemsMap[iditem];

        if (idto in item.usagersid) {
            userRatingsNo = usersMap[idto].ratingsNo;
            usersMap[idto].ratingsNo++;
            if (userRatingNo == 0) {
                usersMap[idto].rating = rating;
            } else {
                usersMap[idto].rating = (usersMap[idto].rating + rating) / usersMap[idto].ratingsNo;
            }
        }
    }

    rate_the_owner(idfrom, idto, iditem, rating) {
        //todo influence of agreement
        if (idto in item.usagersid) {
            rate_the_item(idfrom, idto, iditem, rating);
            userRatingsNo = usersMap[idfrom].ratingsNo;
            usersMap[idfrom].ratingsNo++;
            if (userRatingNo == 0) {
                usersMap[idfrom].rating = rating;
            } else {
                usersMap[idfrom].rating = (usersMap[idfrom].rating + rating) / usersMap[idfrom].ratingsNo;
            }
        }
    }

}

require('data-tree');

categoriesTree = dataTree.create();

class Categories {
    constructor() {
        categoriesTree.insert("games");
        categoriesTree.insert("electronics");
        categoriesTree.insert("vehicle");
        categoriesTree.insert("clothes");
        categoriesTree.insert("camp tent");
        categoriesTree.insert("bicycle");
        categoriesTree.insert("food");
        categoriesTree.insert("tools");
    }

    add(category) {
        categoriesTree.insert(category);
    }

}



let categorize = function (imageFileName, modelJson = "public/mobilenet/model.json") {
    return classify(modelJson, imageFileName).then(predictions => {
        return predictions
    })
}

let category = categorize("public/images/tools.jpg")

category.then(function (result) {
    console.log(result) //will log results.
})

