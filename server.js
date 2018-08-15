const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rate_cakes');

var commentSchema = new mongoose.Schema({
    rating: {type: Number, required: true},
    content: {type: String}
})
var Comment = mongoose.model('Comment', commentSchema);

var cakeSchema = new mongoose.Schema({
    image: {type: String, required: true},
    baker_name: {type: String, required: true},
    comments: [commentSchema]
})

var Cake = mongoose.model('Cake', cakeSchema);

app.post('/api/cakes', function(req,res) {
    var cake = new Cake({image: req.body.url, baker_name: req.body.name});
    cake.save(function(err) {
        if (err) {
            res.json({message: "Failed to post", error: err});
        } else {
            res.json({message: "Success"});
        }
    });
});

app.post('/api/:id/comment', function(req,res) {
    // res.json({message: req.body, msg: "WENT HERE"});
    // console.log("THIS IS BODY", req.body);
    var comment = new Comment(req.body);
    // res.json({message: comment, msg: "WENT HERE"});
    comment.save(function(err) {
        if (err) {
            res.json({message: "Failed to add comment", error: err});
        } else {
            console.log("Success comment saved");
            // res.json({message: "COMMENT SAVED"});
            Cake.updateOne({_id: req.params.id}, {$push: {comments: comment}}, function(err) {
                if (err) {
                    res.json({message: "Error has occured while pushing comment"});
                } else {
                    res.json({message: "Successfully pushed comment into cake"});
                }
            });
        }
    });
})

app.get('/api/comments', function(req,res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            res.json({msg: "Error", error: err});
        } else {
            res.json({msg: "Success", data: comments});
        }
    })
})

app.get('/api/cakes', function(req,res) {
    Cake.find({}, function(err, cakes) {
        if (err) {
            res.json({msg: "Error", error: err});
        } else {
            res.json({msg: "Success", data: cakes});
        }
    });
});

app.get('/api/cake/:id', function(req,res) {
    Cake.findOne({_id: req.params.id}, function(err, cake) {
        if (err) {
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data: cake});
        }
    })
});

app.get('/api/delete', function(req,res) {
    Cake.remove({}, function(err) {

    });
})

app.listen(8000, function() {
    console.log("listening to port 8000");
});