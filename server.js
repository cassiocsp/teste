'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var MongoClient = require('mongodb').MongoClient;
// 
var url = "mongodb://192.168.1.3:27017/RelacDB";
var xpto = "";
var ContaDb = "";
var ContaTab = "";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
 {
    if (err) throw err;
    ContaDb = db.db("RelacDB");
    ContaTab = ContaDb.collection("relac");
 });

 // App
const app = express();
app.get('/', function (req, res) {
  ContaTab.find({}).toArray (function  (err, result){
    res.send(result)
  });
});

app.get('/delete', function (req, res) {
  ContaTab.deleteMany ({status: 'incluido'}, function (err,result){
    if (err) throw err;
     });
     res.send('Dados apagados');
  });


app.get('/teste', function (req, res) {
    const objTeste = (new Date()).toString;
    res.send(objTeste);
    });

app.get('/cadastro', function (req, res) {
  var strInfo = req.param('info');
  var strStatus = 'incluido';
  var objDados = {Teste: 'data', info: strInfo, status: strStatus};
    ContaTab.insertOne(objDados,function (err,result){
    if (err) throw err;
     });
 
 res.send('Funciona');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



