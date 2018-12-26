## Data set aggregation
### Small application on how to manage a data-set of items (array of objects) using ES6
#### To run the application
* npm install
* npm start
* open up the browser and call the page http://localhost:8000

#### About the application
Given an ordered set of data in the following format:

```javascript
[
    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
```

A function named `select` is used to return items from this set.
It has the interface `select(dataSet [, options])`. The options available should include:

- `id`: get just the items with this id
- `auto`: if `true`, just those with `auto: true`, likewise for `false`.
- `minPlayTime`: get just the items with `playTime` equal to or greater than this number.
- `merge`: if set to `true`...
    - Items with matching ids should be merged into one item. When merging:
        - sum the `playTime` fields
        - if any of the `auto` fields are `false` the result should be `false`
    - The other filter options should be applied to the merged data

For example, given the set above...:

```javascript
select(items);
/*
[
    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/

select(items, { merge: true });
/*
[
    { id: 8, playTime:  500, auto: false },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
*/

select(items, { id: 2 });
/*
[
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/

select(items, { minPlayTime: 4000 });
/*
[]
*/

select(items, { merge: true, minPlayTime: 4000 })

/*
[
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
*/
```

The data set has to be found in `sample-data.json`.

#### The application has a small forntend interface to let the user test it more easily!
