'use strict';

/**
 * Dependencies
 */

const fake = require('./');
const exec = require('child_process').exec;

require('chai').should();


/**
 * Tests
 */

describe ('fake-exec', function () {

  afterEach (function () {
    fake.clear();
  });

  it ('with an output string', function (done) {
    let output = 'steve angello rocks';

    fake('ls', output);

    exec('ls', function (err, stdout, stderr) {
      stdout.should.equal(output);

      done();
    });
  });

  it ('with a custom exit code', function (done) {
    let exitCode = 127;

    fake('ls', exitCode);

    exec('ls', function (err) {
      err.code.should.equal(exitCode);

      done();
    });
  });

  it ('with a callback', function (done) {
    let output = 'steve angello rocks';

    fake('ls', function (callback) {
      callback(null, output, null);
    });

    exec('ls', function (err, stdout, stderr) {
      stdout.should.equal(output);

      done();
    });
  });

  it ('skip', function (done) {
    exec('ls', function (err, stdout, stderr) {
      stdout.should.not.equal('steve angello rocks');

      done();
    });
  });

});
