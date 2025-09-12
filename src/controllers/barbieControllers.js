import express from "express";
import dados from "../models/dados.js";
const { barbies } = dados;

const getAllBarbies = (req, res) => {
  res.status(200).json(barbies);
  total: barbies.length;
  barbies: barbies;
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
      message: "Nome e casa são obrigatórios",
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
    bruxo: novoBarbie,
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

  barbie.splice(0, barbie.length, ...barbiesFiltradas);

  res.status(200).json({
    sucess: "true",
    message: "Barbie removida com sucesso",
    barbieRemovida: barbieParaRemover,
  });
};

export { getAllBarbies, getBarbieById, createBarbie, deleteBarbie };
