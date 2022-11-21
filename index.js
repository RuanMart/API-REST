require(".env").config();

const personRoutes = require("./routes/rotas.js");

const express = require("express");

const mongoose = require("mongoose");

const app = express();

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/pessoa", personRoutes);

mongoose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.k0jutta.mongodb.net/bancoapi?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(3000, (req, res) => {
			console.log("server e data base rodando");
		});
	})
	.catch((err) => console.log(err));
