
var assert = require('better-assert');
var util = require('util');
var run = require('comandante');
var debug = require('debug')('mongomerge:test:command');
var through = require('through');

describe('mongomerge command', function(){
  it('works', function(done){
    var stream = run('bin/mongomerge', ['-c', 'test', '-d', 'mongomerge_test']);
    stream.write("_id,hello\n");
    stream.write("\"ObjectId(5256f08e62f740f863000014)\",\"yup\"\n");
    stream.pipe(through(function (stdout){
      debug("stdout: '%s'", stdout);
      assert(stdout == "1 documents updated\n");
      done();
    }));
  });
});


