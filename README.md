# Authentication with React and Hapi

Playing with simple JWT authentication with React.

- React / Redux
- Hapi.js
- Postgres
- JWT authentication

## How to run
1. Run the server 
  1. Go to `path-project-folder/server/` 
  1. Rename config file `./server/config/env.js` to your dev env
  1. Set up db connection in config file
  1. Set env `export NODE_ENV=dev`
  1. Create database. The name of DB see in config
  1. Run knex migration `gulp db:migrate`
  1. Run the server `gulp`
1. Go to `path-project-folder/`
1. Run client `npm start`
1. Open `localhost:8000`

![Screenshot](https://dl.dropboxusercontent.com/u/52699014/git/react-auth.PNG)
![Screenshot](https://dl.dropboxusercontent.com/u/52699014/git/react-auth2.PNG)
