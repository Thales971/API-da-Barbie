import express from "express";
import dados from "../models/dados.js";
import res from "express/lib/response.js";
const { barbies } = dados;

const getAllBarbies = (req, res) => {
  res.status(200).json({
    total: barbies.length,
    barbies: barbies,
  });
};

const getBarbieById = (req, res) => {
  let id = parseInt(req.params.id);

  const barbie = barbies.find((b) => b.id === id);

  res.status(200).json({
    sucess: "true",
    message: "Barbie encontrada com sucesso",
    barbie: barbie,
  });
};

const createBarbie = (req, res) => {
  const { nome, profissao, anoLancamento } = req.body;

  if (!nome || !profissao) {
    return res.status(400).json({
      sucess: "false",
      message: "Nome e profissão são obrigatórios",
    });
  }

  const novaBarbie = {
    id: barbies.length + 1,
    nome: nome,
    profissao: profissao,
    anoLancamento: anoLancamento,
  };

  barbies.push(novaBarbie);

  res.status(201).json({
    sucess: "true",
    message: "Nova Barbie criada com sucesso",
    barbie: novaBarbie,
  });
};

const deleteBarbie = (req, res) => {
  let id = parseInt(req.params.id);
  const barbieParaRemover = barbies.find((b) => b.id === id);

  if (!barbieParaRemover) {
    return res.status(404).json({
      sucess: "false",
      message: "Barbie não encontrada",
    });
  }

  const barbiesFiltradas = barbies.filter((barbie) => barbie.id !== id);

  // Atualiza o array original
  barbies.splice(0, barbies.length, ...barbiesFiltradas);

  res.status(200).json({
    sucess: "true",
    message: "Barbie removida com sucesso",
    barbieRemovida: barbieParaRemover,
  });
};

// PUT /barbies/:id - Atualizar barbie existente por ID
const updateBarbie = (req, res) => {
  const { id } = req.params;
  const { nome, anoLancamento, profissao} = req.body;

  // Validar ID
  if (isNaN(id)) {
      return res.status(400).json({
          success: false,
          message: "ID deve ser um número válido!"
      });
  }

  const idParaEditar = parseInt(id);
  
  // Verificar se barbie existe
  const barbieExiste = barbies.find(b => b.id === idParaEditar);
  if (!barbieExiste) {
      return res.status(404).json({
          success: false,
          message: `barbie com ID ${id} não encontrado para atualização!`
      });
  }

  // Atualizar barbie usando map
  const barbiesAtualizados = barbies.map(barbie => 
      barbie.id === idParaEditar 
          ? { 
              ...barbie, 
              ...(nome && { nome }),
              ...(profissao && { profissao }),
              ...(anoLancamento && { anoLancamento: parseInt(anoLancamento) }),
            }
          : barbie
  );

  // Atualizar array global
  barbies.splice(0, barbies.length, ...barbiesAtualizados);

  // Buscar barbie atualizado para retorno
  const barbieAtualizado = barbies.find(b => b.id === idParaEditar);

  res.status(200).json({
      success: true,
      message: `Dados do barbie ID ${id} atualizados com sucesso!`,
      barbie: barbieAtualizado
  });
};



export { getAllBarbies, getBarbieById, createBarbie, deleteBarbie, updateBarbie };
