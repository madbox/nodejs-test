# nodejs-test

NodeJS first look. This is a simple HTTP REST API application. One 1 model, w/o DB, all objects are stored in memory of application process.
Every request logged with zeromq (works with Listener app from [zeromq-exercise](https://github.com/madbox/zeromq-exercise "Github repo madbox/zeromq-exercise") repo).

## Ubuntu setup:

```bash
sudo apt install npm
sudo apt install node-express-generator
sudo npm install nodemon -g

express nodejs-test
cd nodejs-test
npm install
```

## Run the App

nodemon (in app dir)

API:

- List:
  `curl localhost:3000/users`
- Read:
  `curl localhost:3000/users/3`
- Delete:
  `curl -X DELETE localhost:3000/users/4`
- Create:
  `curl localhost:3000/users/ --data "name=maxim"`
- Update:
  `curl localhost:3000/users/1 --data "name=newname" -X PUT`
