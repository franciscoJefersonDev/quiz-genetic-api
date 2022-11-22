import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(cors())
app.use(express.json())
const prisma = new PrismaClient()

app.post('/new-question', async(request, response) => {
  try {
    const question = request.body.question
    const items = {
      a: request.body.a,
      b: request.body.b,
      c: request.body.c,
      d: request.body.d,
    }
    const correct_item = request.body.correct
    const question_created: any = await add_new_question(question, items, correct_item)
    if(!question_created || question_created.length < 1) return response.status(400).json({ error: "Not possibilty create to questions", msg: "Unexpected error!"})
    return response.status(200).json({ msg: "Created questions with success."})
  } catch(error) {
    return response.status(400).json({ error: error, msg: "Unexpected error!"})
  }
})

/*
  === GET QUESTIONS
  :/difficulty
*/

app.get('/get-questions', async(request, response) => {
  try {
    const questions: any = await get_all_questions()
    return response.status(200).json({ data: questions,msg: "Created questions with success."})
    if(!questions || questions.length < 1) return response.status(400).json({ error: "Not possibilty get this questions", msg: "Unexpected error!"})
  } catch(error) {
    return response.status(400).json({ error: error, msg: "Unexpected error!"})
  }
})

app.delete('/delete-question', async(request, response) => {
  try {
    const question_id = request.body.id
    const questions_deleted: any = await delete_questions(Number(question_id))
    if(!questions_deleted || questions_deleted.length < 1) return response.status(400).json({ error: "Not possibilty delete this question", msg: "Unexpected error!"})
    return response.status(200).json({ msg: "Questions deleted with success."})
  } catch(error) {
    return response.status(400).json({ error: error, msg: "Unexpected error!"})
  }
})

app.listen(process.env.PORT || '3333')

// PRISMA
const add_new_question = async (question: string, items: any, correct: string) => {
  try {
    return await prisma.questions.create({
      data: {
        question: question.toUpperCase(),
        a: items.a.toUpperCase(),
        b: items.b.toUpperCase(),
        c: items.c.toUpperCase(),
        d: items.d.toUpperCase(),
        type: 'question',
        correct: correct.toUpperCase(),
      },
    });
  } catch(error) {
    return []
  }
}

const get_all_questions = async () => {
  try {
    return await prisma.questions.findMany({
      where: {
        type: 'question'
      }
    });
  } catch (error) {
    return []
  }
}

const delete_questions = async (id: any) => {
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