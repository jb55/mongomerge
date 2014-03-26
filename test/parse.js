
var parse = require("../lib/parse");
var assert = require("better-assert");

describe("parser", function(){
  it("parses objectid", function(){
    assert(parse.objectIdStr("ObjectId(abc)") === "abc");
    assert(parse.objectIdStr("ObjectID(abc)") === "abc");
  });
});
