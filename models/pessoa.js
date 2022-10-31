const mongoose = require("mongoose");

const Pessoa = mongoose.model("pessoa", {
	nome: String,
	telefone: String,
	salario: Number,
	aprovacao: Boolean,
});

module.exports = Pessoa;
