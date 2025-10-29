'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export const createTodo = async ({ title, body, completed }: { title: string, body: string, completed: boolean }) => {
  const todo = await prisma.todo.create({
    data: { title, body, completed },
  })
  revalidatePath('/')
  return todo
}

export const getTodos = async () => {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  }
  )
}

export const getTodoById = async (id: string) => {
  return await prisma.todo.findUnique({
    where: { id },
  })
}

export const updateTodo = async (id: string, title: string, body: string, completed: boolean) => {
  const todo = await prisma.todo.update({
    where: { id },
    data: { title, body, completed },
  })
  revalidatePath('/')
  return todo
}

export const deleteTodo = async (id: string) => {
  const deleted = await prisma.todo.delete({
    where: { id },
  })
  revalidatePath('/')
  return deleted
}

export const getTodosByid = async (id: string) => {
  return await prisma.todo.findMany({
    where: { id },
  })
}

export const deleteTodosByid = async (id: string) => {
  const result = await prisma.todo.deleteMany({
    where: { id },
  })
  revalidatePath('/')
  return result
}