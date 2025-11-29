import prisma from "./prisma.js";

export const getAll = async (model) => {
  return await prisma[model].findMany();
};
export const getById = async (model, id) => {
  return await prisma[model].findUnique({
    where: { id: Number(id) },
  });
};

export const createRecord = async (model, data) => {
  return await prisma[model].create({
    data,
  });
};

export const updateRecord = async (model, id, data) => {
  return await prisma[model].update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteRecord = async (model, id) => {
  return await prisma[model].delete({
    where: { id: Number(id) },
  });
};
