var express = require('express');
var app = express();
var dbReader = require('maxmind-db-reader');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/', function(req, res){
  res.send("Welcome to geo location api!!")
});

app.post('/getCordinates', function(req, res){
  var obj = req.body;
  var finalMap = {'list':[]};
  var ipList = obj.ipList;
    (function otherNext(j){
      var ip = ipList[j].ip;
      //console.log("final "+j);
      dbReader.open('./GeoLite2-City.mmdb',function(err,countries){
          if(err) otherNext(j+1);
          countries.getGeoData(ip,function(err,geodata){
            //console.log(geodata);
            if(err) otherNext(j+1);
            if(geodata != null){
              var cordinates = {'latitude': geodata.location.latitude, 'longitude': geodata.location.longitude};
              finalMap.list.push(cordinates);
            }
            if(j >= ipList.length-1){
              console.log(j);
              res.json(finalMap);

            }
            else{
                otherNext(j+1);
            }
          });
        });
  })(0);
});


app.listen(process.env.port||8081);
