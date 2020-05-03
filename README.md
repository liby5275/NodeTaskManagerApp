# NodeTaskManagerApp

This is an application developed using node js. Used express, mongodb, http, jsonwebtoken and few other libraries to develope it.

It's basically a task manager application which mainly consist of,

- create users to the application by signing in.
- sign-in user can create as many tasks he wish under his name
- Rest apis are created to,
  - add, delete, view and update users 
  - add, delete, get, and update tasks under the logged in user
  - login logic created using jwt token concept
- Jwt token based authorization is developed, so login is mandatory to call anyof the above APIs
- Used MongoDb as the data base. So created two mongodb schemas , one for User and one for Task
