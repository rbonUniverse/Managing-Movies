var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var loginRouter = require("./routes/login");
var moviesRouter = require("./routes/search");
var createMovieRouter = require("./routes/create");
var managementRouter = require("./routes/management");
var addNewUserRouter = require("./routes/new");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'secret-key',
    resave:false,
    saveUninitialized: false,
    count: 0
}));

app.use("/login", loginRouter);


var menuRouter = require("./routes/menu");
app.use("/menu", menuRouter); // FIXED
app.use("/search", moviesRouter);
app.use("/create", createMovieRouter);
app.use("/management", managementRouter);
app.use("/new", addNewUserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
