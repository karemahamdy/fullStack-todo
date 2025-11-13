'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma' 
import { auth } from '@clerk/nextjs/server'

export const createTodo = async ({ title, body, completed }: { title: string, body: string, completed: boolean }) => {
  const { userId } = await auth()

   if (!userId) {
    throw new Error('User not authenticated')
   }
   
  const todo = await prisma.todo.create({
    data: { title, body, completed, user_id: userId },
  })
  revalidatePath('/')
  return todo
}

export const getTodos = async ({ userId }:{ userId: string | null}) => {
  return await prisma.todo.findMany({
    where: {
      user_id: userId as string,
    },
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