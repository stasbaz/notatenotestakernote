const express = require('express');
const path = require('path');
const notes = require('./db/db.json')
const PORT = process.env.PORT || 80;
const fs = require('fs')
const app = express();
const sequelize = require("./config/connection")
const Note = require('../Develop/models/Note')


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})





// API ROUTES
app.get("/api/notes", async (req, res) => {
try{
    const NotateData = await Note.findAll()
    res.status(200).json(NotateData);
}catch (err){
    res.status(500).json(err);
}
})

app.post("/api/notes", async (req, res) => {
    try{
        const NotateData = await Note.create(req.body)
        res.status(200).json(NotateData);
    }catch (err){
        res.status(400).json(err);
    }
})

app.delete("/api/notes/:id", async (req, res) => {
    try{
        const NotateData = await Note.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(NotateData);
    }catch (err){
        res.status(500).json(err);
    }
})

sequelize.sync({force: false}).then(() =>{
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })