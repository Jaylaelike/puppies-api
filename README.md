##### 🚀 Quick start:

```
Install node
Install nest cli: `npm i -g @nestjs/cli`
Initialize a nestjs project `nest new project-name`
```

---

#### Swagger Docs

[swagger docs](localhost:7890/api/docs)

#### Postman Documentation:

[Docs](https://documenter.getpostman.com/view/15544476/UyxoiPgX)

---

#### Endpoint

Homepage

> localhost:7890/

GET `All puppies`

> localhost:7890/puppies/all

GET `single puppy`

> localhost:7890/puppies/:id

DELETE `puppy profile`

> localhost:7890/puppies/:id

UPDATE `puppy profile`

> localhost:7890/puppies/:id

POST `Create profile for a puppy`

> localhost:7890/puppies

---

#### Development Database setup

```module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [ 'dist/**/*.entity.js'],
};
```

---

#### Production Database setup

```
require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'],
};
```

#### Heroku link

> https://kute-puppies.herokuapp.com/puppies
