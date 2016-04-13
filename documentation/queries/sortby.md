# SortBy
SortBy has the capability to sort a collection by a key either using ASC or DESC

```js
where(key, is, value)
```

Example :

```js
Collection()
 .where('createdAt', '<=', new Date())
 .sortBy('createdAt', -1)
 .cursor()
```
