'use strict';

/**
 * Dependencies
 */

const remove = require('remove-value');
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

function fake (command, output, exitCode, callback) {
  if (typeof exitCode === 'function') {
    callback = exitCode;
    exitCode = 0;
  }

  if (typeof output === 'function') {
    callback = output;
    output = '';
  }

  if (typeof output === 'number') {
    exitCode = output;
    output = '';
  }

  if (!exitCode) {
    exitCode = 0;
  }

  if (!output) {
    output = '';
  }

  if (!callback) {
    callback = function (done) {
      let err;

      if (exitCode > 0) {
        err = new Error(output);
        err.code = exitCode;
      }

      done(err, output, null);
    };
  }

  let existingFake = find(fakes, function (fake) {
    let fakeCommand = fake[0];

    return fakeCommand === command;
  });

  if (existingFake) {
    remove(fakes, existingFake);
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

ps.exec = function (requestedCommand, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (typeof callback !== 'function') {
    callback = noop;
  }

  let fake = find(fakes, function (fake) {
    let fakeCommand = fake[0];

    return fakeCommand === requestedCommand;
  });

  if (!fake) {
    return exec.apply(ps, arguments);
  }

  fake[1](callback);
};


/**
 * Helpers
 */

function noop () {}
