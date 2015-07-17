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

  it ('with no arguments', function (done) {
    fake('ls');

    exec('ls', function (err, stdout, stderr) {
      stdout.should.equal('');

      done();
    });
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

  it ('override previous fake', function (done) {
    let outputs = [
      'steve angello rocks',
      'axwell rocks'
    ];

    fake('ls', outputs[0]);

    exec('ls', function (err, stdout) {
      stdout.should.equal(outputs[0]);

      fake('ls', outputs[1]);

      exec('ls', function (err, stdout) {
        stdout.should.equal(outputs[1]);

        done();
      });
    });
  });

  it ('skip', function (done) {
    exec('ls', function (err, stdout, stderr) {
      stdout.should.not.equal('steve angello rocks');

      done();
    });
  });

});
