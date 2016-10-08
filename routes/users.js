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
    res.json(collection);
});

module.exports = router;
