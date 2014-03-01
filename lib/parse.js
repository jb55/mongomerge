
var ObjectId = require('mongojs').ObjectId;

exports.header = function(headers){
  var map = {};
  headers.forEach(function(header, i){
    map[header] = i;
  });
  return map;
};

var roid = /ObjectId\(([^\)]+)\)/;

exports.objectId = function(objectId){
  var matched = objectId.match(roid);
  var oid = matched && matched[1] || objectId;
  return ObjectId(oid);
};
