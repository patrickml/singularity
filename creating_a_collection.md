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
