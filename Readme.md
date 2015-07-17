# fake-exec [![Circle CI](https://circleci.com/gh/vdemedes/fake-exec.svg?style=svg)](https://circleci.com/gh/vdemedes/fake-exec)

Fake child_process#exec output for testing.


### Installation

```
$ npm install fake-exec --save
```


### Usage

```javascript
// include dependencies
const fake = require('fake-exec');
const exec = require('child_process').exec;

// set up a fake command
fake('rm -rf /', 'no, thank you');

// execute a command using native child_process#exec method
exec('rm -rf /', function (err, stdout) {
  stdout === 'no, thank you'; // true
});
```

Check out tests (they look good) for more examples.

### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/fake-exec.svg?style=svg)](https://circleci.com/gh/vdemedes/fake-exec)

```
$ make test
```


### License

fake-exec is released under the MIT license.
