## Install & Run

```
$ git clone https://github.com/michael-act/FreeCodeCamp
$ cd FreeCodeCamp/URL\ Shortener
$ npm install
$ npm start
```

#### Try your first URL Shortener Backend program

```shell
$ curl -X POST "url=\"https://google.com/\"" HOST_IP:PORT/api/shorturl
{
  "1343": "https://google.com/",
  "#": "#"
}

$ curl -X POST "url=\"https://instagram.com/\"" HOST_IP:PORT/api/shorturl
{
  "1343": "https://google.com/", 
  "4952": "https://instagram.com", 
  "#": "#"
}
```
Please understand the codes in `./src` for further understanding. 
