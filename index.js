var debug = require('debug')('mongomerge')

function handle (collection, data, opts, cb) {
  if (cb == null) {
    cb = opts
    opts = {}
  }

  opts = opts || {}

  var update = { $set: {} }

  var key = opts.key || '_id'
  var query = {}
  query[key] = data[key]

  Object.keys(data).forEach(function (prop) {
    var elem = data[prop]
    elem = opts.parseNumbers === true && !isNaN(+elem) ? +elem : elem
    if (!(elem === '' && opts.ignoreEmpty)) {
      update.$set[prop] = elem
    }
  })

  delete update.$set[key]

  debug('query %j update %j', query, update)

  if (opts.dryRun) {
    collection.findOne(query, function (err, doc) {
      var keyVal = data[key]
      if (err) {
        console.log("(dry run) would NOT update '%s', got error %s", keyVal, err)
        return cb && cb(null, { n: 0 })
      }

      if (doc == null) {
        console.log("(dry run) would NOT update '%s', key not found", keyVal)
        return cb && cb(null, { n: 0 })
      }

      console.log("(dry run) would update '%s' with %j", keyVal, update)
      return cb && cb(null, { n: 1 })
    })
    return
  }

  collection.update(query, update, { multi: false }, function (err, doc, other) {
    cb && cb(err, doc, other)
  })
}

module.exports = handle
