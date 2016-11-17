# Creating a Model

Creating a singularity model allows you to add custom functions to the data pulled from the database. Also because singularity binds the collection to the model it is aware of the collection it belongs to. This means that we can use functions like `MyModel.set('key', 'newVal').save()`


#### Example Model

```js
// import momentjs so we can return a formatted version of the creation date.
import moment from 'moment';
// import the singularity model class so we can extend it
import { Model } from 'meteor/patrickml:singularity';

export class Project extends Model {
  constructor(doc) {
    super(doc);
    return this;
  }

  // formats the creation data to `MM/DD/YYYY' format
  formattedDate() {
    return moment(this.createdAt).format('MM/DD/YYYY');
  }
}

```

#### Singularity Model Functions

```js
// example of fetching a document from the database, but the returned object is 
// actually a singularity model.
MyCollection()
  .where('key', '=', 'value')
  .first()
  .then((doc) => {
    doc
     // this will use `$set` to update or add a new key to the document
     .set('key', 'new value')
     // this will use `$unset` to remove a key from the document
     .unset('somekey')
     // this will use the `$push` to add a value to an array
     .push('somearray', 'new array value')
     // this will use the `$pull` operator to remove and object from an array
     .pull('somearray', 'remove this value')
     // this will use the `$addToSet` mongo query to only add if the object is unique
     .addToSet('somearrayofobjects', { "foo": "bar" })
     // this is used if you have an object and you don't want to use .set() for each key
     .update({ 
       key: "value"
     })
     .save().then(() => alert('saved!'))

     // sometimes you may want to get data that is deeply nested in an object you can do so
     // with the `getValueForKey` function this function will either return the value 
     // or return undefined. but it lets you use dot notation to keep things safe. This 
     // is great for things like React, but for high computations and calculation is not ideal 
     console.log(doc.getValueForKey("profile.stats.highscore"))
  })

```



