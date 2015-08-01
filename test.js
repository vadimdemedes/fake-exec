'use strict';

/**
 * Dependencies
 */

const expect = require('chai').expect;
const fake = require('./');
const exec = require('child_process').exec;


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
      expect(err).equal(undefined);
      expect(stdout).equal('');

      done();
    });
  });

  it ('with an output string', function (done) {
    let output = 'steve angello rocks';

    fake('ls', output);

    exec('ls', function (err, stdout, stderr) {
      expect(err).equal(undefined);
      expect(stdout).equal(output);

      done();
    });
  });

  it ('with a custom exit code', function (done) {
    let exitCode = 127;

    fake('ls', exitCode);

    exec('ls', function (err, stdout) {
      expect(err instanceof Error).equal(true);
      expect(err.code).equal(exitCode);
      expect(stdout).equal('');

      done();
    });
  });

  it ('with a custom exit code and output', function (done) {
    let exitCode = 127;
    let output = 'steve angello rocks';

    fake('ls', output, exitCode);

    exec('ls', function (err, stdout) {
      expect(err instanceof Error).equal(true);
      expect(err.code).equal(exitCode);
      expect(stdout).equal(output);

      done();
    });
  });

  it ('with a callback', function (done) {
    let output = 'steve angello rocks';

    fake('ls', function (callback) {
      callback(null, output, null);
    });

    exec('ls', function (err, stdout, stderr) {
      expect(err).equal(null);
      expect(stdout).equal(output);
      expect(stderr).equal(null);

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
      expect(err).equal(undefined);
      expect(stdout).equal(outputs[0]);

      fake('ls', outputs[1]);

      exec('ls', function (err, stdout) {
        expect(err).equal(undefined);
        expect(stdout).equal(outputs[1]);

        done();
      });
    });
  });

  it ('skip', function (done) {
    exec('ls', function (err, stdout, stderr) {
      expect(stdout).not.equal('steve angello rocks');

      done();
    });
  });

});
