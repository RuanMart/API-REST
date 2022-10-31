const router = require("express").Router();

const { json } = require("express");
const Pessoa = require("../models/pessoa.js");

// cria um novo usuário
router.post("/", async (req, res) => {
	const { nome, telefone, salario, aprovacao } = req.body;

	if (!nome) {
		res.status(422).json({ error: "o nome é obrigatório" });
		return;
	}

	if (!telefone) {
		res.status(422).json({ error: "o telefone é obrigatório" });
		return;
	}

	if (!salario) {
		res.status(422).json({ error: "o salário é obrigatório" });
		return;
	}

	if (!aprovacao) {
		res.status(422).json({ error: "a aprovação é obrigatória" });
		return;
	}

	const pessoa = {
		nome,
		telefone,
		salario,
		aprovacao,
	};

	try {
		await Pessoa.create(pessoa);

		res.status(200).json({ message: "Pessoa inserida no sistema" });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// retorna todos os usuários
router.get("/", async (req, res) => {
	try {
		const pessoa = await Pessoa.find();

		res.status(200).json({ pessoa });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

//retorna um usuário pelo id passado
router.get("/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const pessoa = await Pessoa.findOne({ _id: id });

		if (!pessoa) {
			res.status(422).json({ message: "usuário não encontrado" });
			return;
		}

		res.status(200).json({ pessoa });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// atualiza um usuário

router.patch("/:id", async (req, res) => {
	const id = req.params.id;

	const { nome, telefone, salario, aprovacao } = req.body;

	const pessoa = {
		nome,
		telefone,
		salario,
		aprovacao,
	};

	try {
		const pessoaAtualizada = Pessoa.updateOne({ _id: id }, pessoa);

		if ((await pessoaAtualizada.matchedCount) === 0) {
			res.status(422).json({ error: "Usuário não encontrado" });
		}

		res.status(200).json({ pessoa });
	} catch (error) {
		res.status(500), json({ erro: error });
	}
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;

	const pessoa = await Pessoa.findOne({ _id: id });

	if (!pessoa) {
		res.status(422).json({ error: "Usuário não encontrado" });
	}

	try {
		await Pessoa.deleteOne({ _id: id });

		res.status(200).json({ message: "Usuário removido com sucesso!" });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

module.exports = router;
