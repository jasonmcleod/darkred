### The game with a hundred names - Now with more Angular

Written and re-written at least 6 times by now. I've called upon my techy friends to see what we can come up with, together.

### Introduction

We don't even know what the hell this is going to be yet, but it's going to be great.


---

#### Adding encounters
	1. Open "Tiled Editor", and the map file
    2. Select the encounters layer and draw the encounter box
    3. Right click the new encounter and give it a property of "id"
    4. Set the value to the next available id from the encounters table

#### Adding fixtures
	1. Open "Tiled Editor", and the map file
    2. Select the fixtures layer, select the fixture, draw

   
#### Updating the database with new map data 
```
$ node ./bin/parseMap.js
```

---

##### Front-end:

    angular.js / jQuery   - framework/bindings with more brains
    easel.js         - canvas with less butthurt
    LESS           - CSS with more awesome
    keymaster         - key bindings with less keycode WTFing.

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

---

### Development

###### Migrations

```
$ # update schema
$ db-migrate up

$ # create a new table
$ db-migrate create info_about_what_you_are_adding
$ # make changes to the new migration file, and then run:
$ db-migrate up

```
 ---
 
### Schema
 	Accounts
 		Characters
 		
	Encounters
 		Spawns
 			Npcs	
 			
 	Fixtures
 	
 	Npc-class
 	Fixture-class
 	Item-class
 	
 	
 		
 	
	
 	


