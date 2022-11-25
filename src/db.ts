import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const add_new_question = async (question: string, items: any, correct: string) => {
  try {
    return await prisma.questions.create({
      data: {
        question: question,
        a: items.a,
        b: items.b,
        c: items.c,
        d: items.d,
        correct: correct,
      },
    });
  } catch(error) {
    return []
  }
}

export const get_all_questions = async () => {
  try {
    return await prisma.questions.findMany();
  } catch (error) {
    return []
  }
}

export const delete_questions = async (id: any) => {
  try {
    return await prisma.questions.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return []
  }
}
