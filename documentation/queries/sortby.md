# SortBy
SortBy has the capability to sort a collection by a key either using ASC or DESC

```js
sortBy(key, direction)
```

Example :

```js
Collection()
 .where('createdAt', '<=', new Date())
 .sortBy('createdAt', -1)
 .cursor()
```

MongoDB Example :

```
Collection.find({
  createdAt : {
    $lte : new Date()
  }
}, {
  sort : {
   createdAt : -1
  }
})
```