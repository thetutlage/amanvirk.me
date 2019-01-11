---
title: CamelCase Lucid models output in AdonisJs
date: '2018-08-19'
spoiler: When working with databases, a popular choice is to make use of <code>snake_case</code> to define table field names.
---

When working with databases, a popular choice is to make use of `snake_case` to define table field names.

Also working with `snake_case` comes with a benefit of accidentally getting bitten by PostgreSQL. *Check the following screenshot*.

[![](https://res.cloudinary.com/adonisjs/image/upload/v1534693931/Screen_Shot_2018-08-19_at_5.32.41_PM_ncdiyg.png)](https://www.postgresql.org/docs/current/static/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS)

However, Javascript programmers are used to of `camelCase` and often reach me asking:

##### Is there any way to auto-convert field names from snake_case to camelCase in Lucid?
Unfortunately, Lucid doesn't do any automatic conversion of field names, and I want to improve that story in upcoming versions.

In the post, I will share a neat way to make use of a custom serializer, which converts all `snake_case` fields to `camelCase` when `toJSON` is called.

---

## Defining Serializer

You can create custom serializers inside `app/Models/Serializers` directory and tell your models to use this new serializer vs. the one shipped with Lucid.

##### app/Models/Serializers/CamelCase.js
```javascript
'use strict'

const _ = require('lodash')
const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class CamelCaseSerializer extends VanillaSerializer {
  _camelizeProperties (collection) {
    return _.reduce(collection, (result, value, key) => {
      result[_.camelCase(key)] = value
      return result
    }, {})
  }

  _attachMeta (modelInstance, output) {
    if (_.size(modelInstance.$sideLoaded)) {
      output.__meta__ = this._camelizeProperties(modelInstance.$sideLoaded)
    }
  }

  _getRowJSON (modelInstance) {
    const json = this._camelizeProperties(modelInstance.toObject())
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    return json
  }
}

module.exports = CamelCaseSerializer
```

1. We extend the `VanillaSerializer` shipped with Lucid.
2. Override a couple of its methods. (I know these are private methods, but that's the only option).
3. Use `lodash` to convert field names using `_.camelCase` method.

---

## Update models to use new Serializer

```javascript
const Model = use('Model')

class User extends Model {
  static get Serializer () {
    return 'App/Models/Serializers/CamelCase'
  }
}
```

---

## Use a Base Model

Now instead of updating all the models, you can create a BaseModel and make all other models extend it.

```javascript
const Model = use('Model')

class BaseModel extends Model {
  static get Serializer () {
    return 'App/Models/Serializers/CamelCase'
  }
  
  static _bootIfNotBooted () {
    if (this.name !== 'BaseModel') {
      super._bootIfNotBooted()
    }
  }
}
```

The `_bootIfNotBooted` definition is important since we don't want our `BaseModel` to boot.

Finally, update other models to extend the `BaseModel`.

```javascript
const BaseModel = use('App/Models/BaseModel')

class User extends BaseModel {
}
```

---

## Important

The serializers are invoked only when you call `toJSON` to a query output. Accessing attributes of the model instance will still have `snake_case` field names.

This will be improved in future versions of Lucid :)