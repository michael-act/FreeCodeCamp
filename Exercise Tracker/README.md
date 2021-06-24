## Install & Run

```
$ git clone https://github.com/michael-act/FreeCodeCamp
$ cd FreeCodeCamp/Exercise\ Tracker
$ npm install
$ npm start
```

#### Try your first Notes Backend program

```shell
$ curl -X POST "username=\"yourname\"" HOST_IP:PORT/api/users
{
  "username": "yourname",
  "_id": "5ed01af2659fff007e71b8f1"
}

$ curl -X GET HOST_IP:PORT/api/users
{
  "username": "yourname",
  "_id": "5ed01af2659fff007e71b8f1"
}

$ curl -X POST "description=\"Belajar%20JS\"&duration=\"12\", date=\"2021-06-24\"" HOST_IP:PORT/api/users/5ed01af2659fff007e71b8f1/exercise
{
  "_id": "5ed01af2659fff007e71b8f1", 
  "username": "yourname", 
  "description": Belajar JS, 
  "duration": 12, 
  "date": "Thu Jun 24 2021"
}

$ curl -X GET HOST_IP:PORT/api/users/5ed01af2659fff007e71b8f1/logs
{
  "_id": "5ed01af2659fff007e71b8f1", 
  "username": "yourname", 
  "count": 2, 
  "logs": [
    {
      "description": Belajar JS, 
      "duration": 12, 
      "date": "Thu Jun 24 2021"
    }
  ]
}
```
Please understand the codes in `./src` for further understanding. 
