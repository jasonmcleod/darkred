### The game with a hundred names - Now with more Angular

Written and re-written at least 6 times by now. I've called upon my techy friends to see what we can come up with, together.

### Introduction

We don't even know what the hell this is going to be yet, but it's going to be great.

##### Front-end:

    angular.js / jQuery 	- framework/bindings with more brains
    easel.js 				- canvas with less butthurt
    LESS 					- CSS with more awesome
    keymaster 				- key bindings with less keycode WTFing.

##### Back-end:

    node.js (0.8.12)		
    socket.io    			
    node-orm
    db-migrate
    ejs
    node-mailer

### Configuration
Edit `database.json` to match your environment, but don't commit it.

```
$ git update-index --assume-unchanged database.json
$ npm install
$ db-migrate up
$ npm test
```

### Run
``` 
$ node app.js
```