# Operators
Singularity has changed the MongoDB operators to match the syntax that most developers are used to when programming.

```
 = is $eq (we cannot use $eq in minimongo so we just do { key : value })
 > is $gt
 < is $lt
 >= is $gte
 <= is $lte
 != is $ne
 in is $in
 !in is $nin
 or is $or
```