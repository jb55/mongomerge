
var ObjectId = require('mongojs').ObjectId;

var exports = module.exports;

exports.header = function(headers){
  var map = {};
  headers.forEach(function(header, i){
    map[header] = i;
  });
  return map;
};

var roid = /ObjectId\(([^\)]+)\)/i;

exports.objectIdStr = function(objectId){
  var matched = objectId.match(roid);
  var oid = matched && matched[1] || objectId;
  return oid;
};

exports.objectId = function(objectId){
  return ObjectId(exports.objectIdStr(objectId));
};
