var express = require('express');
var app     = express();

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

app.listen(4000, function(){
    console.log('~~~~~~~~~~~~~~~~~~~');
    console.log("Let's chat on 4000!");
    console.log('~~~~~~~~~~~~~~~~~~~');
});
