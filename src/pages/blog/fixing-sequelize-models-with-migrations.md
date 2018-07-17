---
templateKey: blog-post
title: Fixing Sequelize Models with Migrations
date: '2018-07-17T15:30:22-04:00'
description: >-
  Sequelize is a great ORM for NodeJS applications that utilize some sort of
  relational backend. Occasionally, you'll need to update your models if you did
  something silly or forgot something. Here's my approach to solving model
  problems and doing database changes with Sequelize.
tags:
  - nodejs
category: Software Development
image: /img/map.png
published: false
---
This morning, I took a look at the flow our current student signup over at Univjobs. When I opened up the dropdown list for Area of Study, I noticed that there were a number of duplicates for each field. That's definitely not correct. There should only be about 80-90 "areas of study", it's something that we seed initially when we create the database.

![accidentally added autoIncrement = true](/img/many-area-of-studies.png)

To confirm that this wasn't just something rendering funny on the front end, I took a look at what was coming back from the List API.

![Yep, I fucked up](/img/more-silly.png)

Yep, there's over 600 areas of study. I definitely did something wrong there.

I realized that what was going on was: when we run our migrations in our Elastic Beanstalk EC2s, it runs the initial database seeder. Now, the database seeder is supposed to fail if a database constraint has already been met (such as a unique constraint). 

So I moved over to my sequelize model for areas of study.

```
module.exports = function(sequelize, DataTypes) {
  const ListsAreaOfStudy = sequelize.define('lists_area_of_study', {
    area_of_study_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
 <== that shouldn't be there
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true
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

Now, I didn't do it all wrong, I have a `unique` constraint on the `name` field so I'm not sure why that didn't fail, but there definitely shouldn't be an `autoIncrement: true` here. 

So how do we fix this? We could just delete all the excess Areas of Study above the first batch that I created and then remove the `autoIncrement:true` field from the model definition and the created table. But, then we might be deleting the relationships between students to those areas of study. Dang.

Looks like we have to write a migration.

Here's what we'll do:

1. Get all of the Areas of Studies
2. Reassign relationships for all of the excess areas of studies to the very first one.
3. Delete the excess ones.
4. Delete the `autoIncrement:true` field.

That should solve our problem... but first, we'll take an extra database backup- just in case we mess something up.

Creating the migration

`sequelize migration:create --name "fix area of studies"`

That'll create a new migration file for me.

Now, we'll start building it out.

First, we want to get all of the Areas of Studies.

```
'use strict';

const Models = require('../../app/models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      let areaOfStudies;
      let map = {};

      try {
        // Get all area of studies
        areaOfStudies = await Models.ListsAreaOfStudy.findAll({ where: { } })
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

```
// Place all of them in a map by name
areaOfStudies.forEach((area) => {
  if (!map.hasOwnProperty(area.name)) map[area.name] = [];
  map[area.name].push(area.area_of_study_id);
})
```

Lets see what we have so far.

![null](/img/map.png)

So far so good. Now, let's iterate over each of these keys (while also finessing some fancy ES6 syntax for iterating over Objects) and print out what we intend to do for each value.

```
// Now, for each item in the map, we have to get the students that have that area of study
for (let [name, ids] of Object.entries(map)) {
  // Get all students that have this area of study
  let properId = ids[0];
  let scrapIds = ids.splice(1);

  for(let id of scrapIds) {
    console.log(`Students who have ${name} with ${id} should be => ${properId}`);
  }
}
```

And let's see what we have so far.

![](/img/right-track.png)

Alright, looks like we're definitely on the right track. In case you haven't noticed, I like to print things out every step of the way for destructive things like this just so I can hopefully be sure I don't have to start all over.

```
CREATE TABLE `lists_area_of_study` (
  `area_of_study_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`area_of_study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=640 DEFAULT CHARSET=utf8;
```

And then after:

```
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

```
'use strict';

const Models = require('../../app/models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
