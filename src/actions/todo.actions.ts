'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTodo = async ({title, body, completed }:{ title: string, body: string, completed: boolean }) => {
  return await prisma.todo.create({
    data: { title, body, completed },
  })
}

export const getTodos = async () => {
  return await prisma.todo.findMany()
}

export const getTodoById = async (id: string) => {
  return await prisma.todo.findUnique({
    where: { id },
  })
}       

export const updateTodo = async (id: string, title: string, body: string, completed: boolean) => {
  return await prisma.todo.update({
    where: { id },
    data: { title, body, completed },
  })
}

export const deleteTodo = async (id: string) => {
  return await prisma.todo.delete({
    where: { id },
  })
}   

export const getTodosByid = async (id: string) => {
  return await prisma.todo.findMany({
    where: { id },
  })
}     

export const deleteTodosByid = async (id: string) => {
  return await prisma.todo.deleteMany({
    where: { id },
  })
}   