import express from "express";

// config import express
const configViewEngine = function(app){
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;