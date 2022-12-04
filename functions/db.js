const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const add_new_question = async (question, items, correct) => {
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

const get_all_questions = async () => {
  try {
    return await prisma.questions.findMany();
  } catch (error) {
    return []
  }
}

const delete_questions = async (id) => {
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


module.exports = {
  add_new_question,
  get_all_questions,
  delete_questions
}