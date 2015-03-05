var debug = require('debug')('mongomerge');

function handle(collection, data, opts, cb){
  var updated = 0;
  if (cb == null) {
    cb = opts
    opts = {}
  }

  opts = opts || {}

  var update = { $set: {} };
  var query = { _id: data._id };

  Object.keys(data).forEach(function (prop) {
    var elem = data[prop]
    if (!(elem === "" && opts.ignoreEmpty))
      update.$set[prop] = elem
  })

  delete update.$set._id;

  debug("query %j update %j", query, update);

  if (opts.dryRun) {
    console.log("(dry run) would update %s with %j", data._id.toString(), update)
    return cb && cb(null, 0)
  }

  collection.update(query, update, { multi: false }, function(err, _, updated){
    cb && cb(err, 1);
  });
}

module.exports = handle
