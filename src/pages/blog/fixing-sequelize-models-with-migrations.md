---
templateKey: blog-post
title: Fixing Sequelize Models with Migrations
date: '2018-07-17T15:30:22-04:00'
description: >-
  Sequelize is a great ORM for NodeJS applications that are built on relational backends. Inevitably, you'll need to update your models as the database
  requirements change.. or if you did
  something silly. Here's a real life approach to using Sequelize to doing database migrations.
tags:
  - NodeJS, JavaScript, Sequelize
category: Software Development
image: /img/map.png
published: true
---

# The problem
This morning, I took a look at the current student signup flow that I coded over at Univjobs. When I opened up the dropdown list for Area of Study, I noticed that there were a number of duplicates for each field. That's definitely not correct. There should only be about 80-90 "areas of study", it's something that we seed initially when we create the database.

![accidentally added autoIncrement = true](/img/many-area-of-studies.png)

To confirm that this wasn't just something rendering funny on the front end, I took a look at what was coming back from the List API.

![Yep, I fucked up](/img/more-silly.png)

Yep, there's over 600 areas of study. I definitely did something wrong there.

After some investigation of our current database, looking at the models, and recalling a conversation I had with the integration engineer for this project, I realized that what was going on.

We had just moved over to using Elastic Beanstalk, we had to update our CI. At the end of the deployment script, we were running the [initial database seeder](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-seed). Now, the database seeder is supposed to fail if a database constraint has already been met (such as a unique constraint). I expected it to fail if we tried to add the same Area of Study twice.

Looking at the model for Area of Study, we can notice a couple of things.

```javascript
module.exports = function(sequelize, DataTypes) {
  const ListsAreaOfStudy = sequelize.define('lists_area_of_study', {
    area_of_study_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true // <== Strange, this seems to not have worked.
    }
  },{
    timestamps: true,
    underscored: true,
    tableName: 'lists_area_of_study',
    instanceMethods: {}
  })

  ListsAreaOfStudy.associate = (models) => {}

  return ListsAreaOfStudy;
};
```

Now, I didn't do it all wrong, I have a `unique` constraint on the `name` field BUT I probably did this only in the Sequelize model file and not
in the migration script when I first script-created this model.

Let's take a look at what this model looks like in our database.

```sql
CREATE TABLE `lists_area_of_study` (
  `area_of_study_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`area_of_study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=640 DEFAULT CHARSET=utf8;
```

Yeah, that's most likely what happened we're missing the `unique` constraint in the database. 

So how do we fix this? Because what we're dealing with right now is the result of hundreds of production users using the app and creating a relationship between their account and their Area of Study. We obviously can't go and change this all manually, so we need to script it using a Sequelize migration.

# The approach

Here's what we'll do in our migration script:

1. Get all of the Areas of Studies
2. Reassign relationships for all of the excess areas of studies to the initial id (1-60).
3. Delete the excess ones (60 and so on).
4. Enable the unique constraint and set the `autoIncrement:true` field to false.

That should solve our problem... but first, we'll take an extra database backup- just in case we mess something up.

## Creating the migration

`sequelize migration:create --name "fix area of studies"`

That'll create a new migration file for me called `20180721190331-fix-area-of-studies.js` in my migrations folder.

Now, we'll start building it out.

## Get all of the Areas of Studies

First, we want to get all of the Areas of Studies.

```javascript
'use strict';

const Models = require('../../app/models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      let areaOfStudies;
      let map = {};

      try {
        // Get all area of studies
        areaOfStudies = await Models.ListsAreaOfStudy.findAll({ 
          where: {} 
        })
        console.log(areaOfStudies.length);
      }

      catch (err) {
        console.log(err);
      }
    })
  },

  down: (queryInterface, Sequelize) => {}
};
```

So that should get all of our area of studies.

![null](/img/number-of.png)

Yikes, there's 639 of them.

OK, next we'll sort them all into a map.

```javascript
// Place all of them in a map by name
areaOfStudies.forEach((area) => {
  if (!map.hasOwnProperty(area.name)) map[area.name] = [];
  map[area.name].push(area.area_of_study_id);
})
```

Lets see what we have so far.

![null](/img/map.png)

So far so good. Now, let's iterate over each of these keys (while also finessing some fancy ES6 syntax for iterating over Objects) and print out what we intend to do for each value.

```javascript
// Now, for each item in the map, we have to 
// get the students that have that area of study
for (let [name, ids] of Object.entries(map)) {
  // Get all students that have this area of study
  let properId = ids[0];
  let scrapIds = ids.splice(1);

  for(let id of scrapIds) {
    console.log(
      `Students who have ${name} with ${id} should be => ${properId}
    `);
  }
}
```

And let's see what we have so far.

![](/img/right-track.png)

Alright, looks like we're definitely on the right track. In case you haven't noticed, I like to print things out every step of the way for destructive things like this in order to prevent having to start all over if I did something I didn't mean to.

## Reassign relationships

Now let's actually do it. Let's reassign those relationships. We'll just add one line here...

```javascript
// Now, for each item in the map, we have to 
// get the students that have that area of study
for (let [name, ids] of Object.entries(map)) {
  // Get all students that have this area of study
  let properId = ids[0];
  let scrapIds = ids.splice(1);

  for(let id of scrapIds) {
    console.log(
      `Students who have ${name} with ${id} should be => ${properId}
    `);
    await queryInterface.sequelize.query(
      `UPDATE student SET area_of_study_id = ${properId} where area_of_study_id = ${id};`
    )
  }
}
```

## Delete excess areas of study
We can clean up the rest that we don't need really easily with this one liner.

```javascript
await queryInterface.sequelize.query(`DELETE from lists_area_of_study WHERE area_of_study_id >= 60;`)
```

## Update model definitions
The last bit we need to do is update our model definitions so that this doesn't happen again.
Let's add a unique constraint on the name field (for real this time).

```javascript
await queryInterface.addConstraint('lists_area_of_study', ['name'], {
  type: 'unique',
  name: 'unique_area_of_study'
});
```

We can confirm this by checking the table definition. Here's the before:

```sql
CREATE TABLE `lists_area_of_study` (
  `area_of_study_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`area_of_study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=640 DEFAULT CHARSET=utf8;
```

And then after:

```sql
CREATE TABLE `lists_area_of_study` (
  `area_of_study_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`area_of_study_id`),
  UNIQUE KEY `unique_area_of_study` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=640 DEFAULT CHARSET=utf8;
```

Problem solved.

Here's the whole script.

```javascript
'use strict';

const Models = require('../../app/models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      let areaOfStudies;
      let map = {};

      try {
        // Get all
        areaOfStudies = await Models.ListsAreaOfStudy.findAll({ where: { } })
        
        // Place all of them in a map by name
        areaOfStudies.forEach((area) => {
          if (!map.hasOwnProperty(area.name)) map[area.name] = [];
          map[area.name].push(area.area_of_study_id);
        })

        // Now, for each item in the map, we have to get the students that have that area of study
        for (let [name, ids] of Object.entries(map)) {
          // Get all students that have this area of study
          let properId = ids[0];
          let scrapIds = ids.splice(1);

          for(let id of scrapIds) {
            console.log(`Updating students who have ${name} with ${id} should be => ${properId}`);
            await queryInterface.sequelize.query(`UPDATE student SET area_of_study_id = ${properId} where area_of_study_id = ${id};`)
          }
        }

        // Then we'll delete all the old area of studies
        await queryInterface.sequelize.query(`DELETE from lists_area_of_study WHERE area_of_study_id >= 60;`)
        console.log("Deleted old")

        // Then, we'll ensure that's a unique constraint
        await queryInterface.addConstraint('lists_area_of_study', ['name'], {
          type: 'unique',
          name: 'unique_area_of_study'
        });
        console.log("Add unique constraint to lists_area_of_study")

        resolve();
      }

      catch (err) {
        console.log(err);
      }
    })
  },

  down: (queryInterface, Sequelize) => {}
};
```

The sequelize ORM really is a great tool for building robust web apps with NodeJS. If you're thinking about using a relational database for NodeJS and looking for an ORM to use, I'd recommend Sequelize because it has a really decent community behind it and it's more mature than some of the other tools out there. 

My recommendation for someone starting with it though, however, is to read the documentation. And read it well. Sequelize can be super useful in production, but it can also cause a lot of headaches if it's not being used properly.

If you'd like more real life content or tutorials on building applications with the Sequelize ORM, just let me know! I've been through the trenches with it.