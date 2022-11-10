const express = require("express");
const app = express();
var path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const http = require("http");
const server = http.createServer(app);
/* const PORT = 3000; */

var mainRouter = require('./routes/main');
var boardRouter = require('./routes/board');
var usersRouter = require('./routes/user');
var hello = require('./routes/hello');

// テンプレートエンジンの指定
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //jsonのリクエスト/レスポンスを正しく受け取る為に必要
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // corsを有効にする

app.use('/', mainRouter);
app.use('/board', boardRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'natsu0521',
    database: 'map_db'
});

app.get("/howto", (req, res) => {
    res.render('./howto.ejs');
});

app.get("/map", (req, res) => {
    res.render('./map.ejs');
});

app.get("/users", (req, res) => {
    res.render('./users');
});

app.get("/board", (req, res) => {
    res.render('./board');
});

app.get("/gmap", (req, res) => {
    res.render('./gmap');
});

app.get("/test", (req, res) => {
    res.render('./test');
});

server.listen(process.env.PORT || 3000, () => {
    console.log("listen on 3000");
});

/* app.listen(PORT, console.log("server running")); */