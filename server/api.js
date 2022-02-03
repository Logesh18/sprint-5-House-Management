const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const port=8000;

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const connection=mysql.createConnection({
    host:'sql6.freesqldatabase.com',
    user:'sql6469944',
    password:'2lQmeUJjVf',
    database:'sql6469944',
    port:3306
});

try
{
    console.log("Database connected");
    var q = "SHOW TABLES LIKE 'housemanagement'";
    connection.query(q, function (error, result) {
        if(result.length === 0)
        {
            var q = "CREATE TABLE housemanagement (houseId VARCHAR(50) NOT NULL, houseNo VARCHAR(50),  status VARCHAR(50),  type VARCHAR(50) NOT NULL,  PRIMARY KEY (houseId,type))";
            connection.query(q, function (error, result) {
                console.log("Table is created successfully");
            });
        }
        else{
            console.log("Table is already created");
        }
    });
}
catch(error)
{
    console.log(error);
}

const showData=(req,res)=>{
    var q = "SELECT * from housemanagement";
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
           res.json(result);
        }
    });
}

app.post('/saveHouse',(req,res)=>{
    if(req.body.houseId!=="" && req.body.type!==""){
        var q = "INSERT INTO housemanagement (houseId, houseNo, status, type) VALUES ("+"'"+ req.body.houseId+"'" +", "+"'"+req.body.houseNo+"'"+", "+"'"+req.body.status+"'"+", "+"'"+req.body.type+"'"+")";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "House Id and House Type should not be an empty field"});
    }
})

app.get('/deleteHouse',(req,res)=>{
    if(req.body.houseId!==""){
        var q = "DELETE FROM housemanagement"+" WHERE houseId="+"'"+req.query.id+"'";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Id should not be an empty field"});
    }
})

app.get('/getAllHouse',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        var q = "SELECT * from housemanagement WHERE houseId="+"'"+req.query.id+"'";
    }
    else
    {
        var q = "SELECT * from housemanagement";
    }
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
            res.json(result);
        }
    });
})

app.get('/getHouse',(req,res)=>{
    var q = "SELECT * from housemanagement WHERE houseId="+"'"+req.query.id+"'";
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
            res.json(result);
        }
    });
})

app.get('/getByType',(req,res)=>{
    var q = "SELECT * from housemanagement WHERE type="+"'"+req.query.type+"'";
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
            res.json(result);
        }
    });
})

app.listen(port,()=>console.log(`server is listening in port ${port}`));