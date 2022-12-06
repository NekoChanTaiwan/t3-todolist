import { router, protectedProcedure } from '../trpc'
import { createTodoSchema } from '@/components/TodoForm'
import { z } from 'zod'

export const todoRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    const { prisma, session } = ctx
    return prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }),

  create: protectedProcedure
    .input(createTodoSchema)
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx
      const { content } = input
      return prisma.todo.create({
        data: {
          content,
          userId: session.user.id,
        },
      })
    }),

  checked: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        checked: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx
      const { id, checked } = input
      return prisma.todo.update({
        where: {
          id,
        },
        data: {
          checked,
        },
      })
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx
      const { id } = input
      return prisma.todo.delete({
        where: {
          id,
        },
      })
    }),
})
