# Select
Select has the capability to pick out fields to be returned by the database

```js
select(...keys)
```

Example :

```js
Collection()
 .select('createdAt', 'name', 'foobar')
 .where('createdAt', '<=', new Date())
 .cursor()
```

