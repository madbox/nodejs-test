var express = require('express');
var router = express.Router();

var collection = [
    { name: 'mikle' },
    { name: 'bob' },
    { name: 'albert' }
];

/* GET users listing. */
router.get('/', function(req, res) {
    res.json(collection);
});

router.get(/^\/(\d+)$/, function(req, res) {
    res.json(collection[req.params[0]]);
});

router.delete(/^\/(\d+)$/, function(req, res) {
    res.json(collection.splice(req.params[0],1));
});

router.post('/', function(req, res) {
    if (req.body.name) {
        var new_item = {name: req.body.name};
        collection.push( new_item );
        res.json(collection);
    } else {
        res.status(422).send("Unprocessible entity");
    }
});

// Not implemented yet
router.put(/^\/(\d+)$/, function(req, res) {
    console.log("update with id:" + req.params[0] );

    // if there is defined item in collection with id from request params[0]
    if (collection[req.params[0]] && req.body.name) {
        collection[req.params[0]].name = req.body.name;
        res.json(collection[req.params[0]]);
    } else {
        res.status(422).send("Unprocessible data or entity not found." +
                             " id:" + req.params[0] +
                             " name:" + req.body.name);
    }
});

module.exports = router;
