# GroupBy

Example:

```js
Collections.Projects().where('serviceType', 'in', [ 'HVAC', 'Plumbing' ]).group('serviceType', ($group) => {
  $group
   .sum('cost', 'totalSpend')
   .avg('cost', 'avgSpend')
   .min('cost', 'minSpend')
   .max('cost', 'maxSpend')
   .first('createdAt', 'firstCreated')
   .last('createdAt', 'lastCreated')
   .first('clientId')
  .build();
}).aggregate().then((result) => { console.log(result) })
```

result:
```js
[
  {
    "_id": "Plumbing",
    "totalSpend": 252565.86,
    "avgSpend": 5051.3171999999995,
    "minSpend": 118.83,
    "maxSpend": 9794.27,
    "firstCreated": "2016-03-24T14:23:28.701Z",
    "lastCreated": "2016-09-16T12:23:01.487Z",
    "clientId": "9b0641d5-d62b-5947-a1f9-4a069023eae0"
  },
  {
    "_id": "HVAC",
    "totalSpend": 205522.51999999996,
    "avgSpend": 4893.3933333333325,
    "minSpend": 258.75,
    "maxSpend": 9300.66,
    "firstCreated": "2016-06-02T11:09:01.841Z",
    "lastCreated": "2016-03-09T08:47:15.164Z",
    "clientId": "37ed7797-4316-53f4-a115-7632801d4a95"
  }
]
```