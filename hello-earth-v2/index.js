const express = require("express");
const bodyParser = require("body-parser");
const generate = require('project-name-generator');

let port = process.env.PORT || 8080;

let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

let machineName = generate({ words: 3, number: true }).dashed

app.disable('etag');

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>WebApp</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <style>
        .container
        {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .title
        {
          font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
          display: block;
          font-weight: 300;
          font-size: 40px;
          color: #35495e;
          letter-spacing: 1px;
        }
        .subtitle
        {
          font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
          font-weight: 300;
          font-size: 30px;
          color: #526488;
          word-spacing: 5px;
          padding-bottom: 15px;
        }
        </style>
      </head>
      <body>
        <section class="container">
          <div>
            <h1 class="title">
              👋 I am ${machineName} I ❤️ 🐼
            </h1>
            <h2 class="subtitle">
              Hello 🌍 v2
            </h2>
          </div>
        </section>
      </body>
    </html>
  `)
})

app.listen(port)
console.log(`🌍 ${machineName} is started - listening on `, port)
