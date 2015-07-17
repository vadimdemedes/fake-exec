'use strict';

/**
 * Dependencies
 */

const find = require('array-find');
const ps = require('child_process');

const exec = ps.exec;


/**
 * Expose fake-exec
 */

module.exports = exports = fake;

exports.clear = clear;


/**
 * Registered responses
 */

const fakes = [];


/**
 * Add a fake response to collection
 */

function fake (command, callback) {
  // output string provided
  if (typeof callback === 'string') {
    let output = callback;

    callback = function (done) {
      done(null, output, null);
    };
  }

  // exit code provided
  if (typeof callback === 'number') {
    let exitCode = callback;

    callback = function (done) {
      let err = new Error();
      err.code = exitCode;

      done(err, null, null);
    };
  }

  fakes.push([command, callback]);
}


/**
 * Clear all fake responses
 */

function clear () {
  fakes.length = 0;
}


/**
 * Monkey-patch child_process#exec
 */

ps.exec = function (requestedCommand, callback) {
  let fake = find(fakes, function (fake) {
    let fakeCommand = fake[0];

    return fakeCommand === requestedCommand;
  });

  if (!fake) {
    return exec.apply(ps, arguments);
  }

  fake[1](callback);
};
