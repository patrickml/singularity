# Creating a Collection

Creating a singularity collection allows you to use singularities querying and model system.


#### Example Class

```js
// import in the Collection class from the singularity package
import { Collection } from 'meteor/patrickml:singularity';
// import in the model you would like to use for your collection
import { Project } from '../models/project';

export class Projects extends Collection {
  constructor() {
    super({ name: 'projects', model: Project });
  }
}
```

#### Additional Class Functions

Because singularity uses classes we can also add custom functions to our collections now. For example you may want to create a `findByServiceType` on the `Projects` collection. Doing so would look like the following.

```js
// import in the Collection class from the singularity package
import { Collection } from 'meteor/patrickml:singularity';
// import in the model you would like to use for your collection
import { Project } from '../models/project';

export class Projects extends Collection {
  constructor() {
    super({ name: 'projects', model: Project });
  }

  findByServiceType(service) {
    // create a new query instance
    const query = this.newQuery();
    // return the sinularity query so on when we do call `findByServiceType` we still have
    // the ability to choose to pull the data via a `cursor` or a `promise` for example
    // Examples: 
    //  Projects.findByServiceType("HVAC").cursor().fetch()
    //  Projects.findByServiceType("HVAC").firstSync()
    //  Projects.findByServiceType("HVAC").first().then().catch()
    //  Projects.findByServiceType("HVAC").fetch().then().catch()
    return query.where('serviceType', '=', service);
  }
}
```

#### Use with Existing Collections (Meteor.users)

Sometimes a package will have already created a collection for you. However, you may want to use singularity on that collection, for example `Meteor.users`. Well you are in luck. There is a way to do so and here is an example:

```js
import { Collection } from 'meteor/patrickml:singularity';
import { Meteor } from 'meteor/meteor';
import { User } from '../models/user';

// notice the transform here. Because the collection has already been created we need to manually add the transformation before we pass it into singularity
Meteor.users._transform = (user) => new User(user);

export class Users extends Collection {
  constructor() {
    // we added the key `collection` which references `Meteor.users` singularity will take 
    // care of everything else from here.
    super({ name: 'users', model: User, collection: Meteor.users });
  }
}
```


