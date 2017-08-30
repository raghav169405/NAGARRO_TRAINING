var express=require('express');
var bodyparser=require('body-parser');

var urlencodedParser=bodyparser.urlencoded({extended:false});

var app=express();

app.listen(3012,"127.0.0.1");

app.use('/assets/form',express.static(__dirname+'/assets'));
app.use('/form',express.static(__dirname+'/assets'));


app.post('/submit',urlencodedParser,function (req,res) {
    if(!req.body){return res.sendStatus(404);}
    var dob=req.body.dob;
    var date=new Date();

    var f=new Date(dob);

    var send= Math.ceil((date-f)/(24*60*60*1000));
    res.send("Hey "+req.body.name +' you are here form '+ send +' many Days on this Planet' );

});