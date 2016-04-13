# Where
```js
where(key, is, value)
```

Where has the capability to find by various operators. In MongoDB this is where you would put an object into your `find` function like so

```js
Collection.find({
 createdAt : {
  $lte : new Date()
 }
})
```

Example :

```js
Collection()
 .where('createdAt', '<=', new Date())
 .cursor()
```
