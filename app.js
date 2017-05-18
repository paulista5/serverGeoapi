var express = require('express');
var app = express();
var dbReader = require('maxmind-db-reader');
var bodyParser = require('body-parser');
var maxmind = require('maxmind');
var cityLookup2 = maxmind.openSync('./GeoLite2-City.mmdb');

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
      var city;
          if(cityLookup2!=null)
              city = cityLookup2.get(ip);
          if(city!=null){
              finalMap.list.push({latitude: city.location.latitude, longitude:city.location.longitude});
          }
            if(j >= ipList.length-1){
              console.log(j);
              res.json(finalMap);
            }
            else{
                otherNext(j+1);
        }
  })(0);
});
app.post('/endPoint', function(req, res){
  var obj = req.body;
  var list = [];
  var ipList = obj.ipList;
  for(var i = 0; i<ipList.length; i++){
    var ip = ipList[i];
    //console.log(i);
    maxmind.open('./GeoLite2-City.mmdb', function(err, cityLookup){
      if(err) throw err;
      console.log("open database");
          var city = cityLookup.get(ip);
          if(city!=null){
            var cordinates = {'latitude': city.location.latitude, 'longitude': geodata.location.longitude};
            //console.log(cordinates);
            list.push(cordinates);
          }
          if(list.length == ipList.length){
            res.json({finalMap: list});
          }
    });
  }
});


app.get('/countries', function(res, req){
  maxmind.open('./GeoLite2-City.mmdb', function(err, countries){
    console.log(countries);
  });
});
app.post('/endpoint2', function(req, res){
  var obj = req.body;
  var finalMap = {'list':[]};
  var ipList = obj.ipList;
    (function otherNext(j){
      var ip = ipList[j].ip;
      //console.log("final "+j);
          if(city!=null)
            var city = cityLookup2.get(ip);
          if(city!=null){
              finalMap.list.push({latitude: city.location.latitude, longitude:city.location.longitude});
          }
            if(j >= ipList.length-1){
              console.log(j);
              res.json(finalMap);
            }
            else{
                otherNext(j+1);
        }
  })(0);
});


app.listen(8081);
