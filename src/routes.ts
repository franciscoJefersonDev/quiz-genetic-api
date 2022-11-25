import express from "express"
import { add_new_question, delete_questions, get_all_questions } from "./db"

const router = express.Router()

router.post('/questions', async(request, response) => {
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
    if(!question_created || question_created.length < 1) return response.status(400).json({ error: "Is not possible create this question!", msg: "Unexpected error!"})
    return response.status(200).json({ msg: "Created question with success."})
  } catch(error) {
    return response.status(400).json({ error: error, msg: "Unexpected error!"})
  }
})

router.get('/questions', async(request, response) => {
  try {
    const questions: any = await get_all_questions()
    if(!questions || questions.length < 1) return response.status(400).json({ error: "Not possibilty get this questions", msg: "Unexpected error!"})
    return response.status(200).json({ data: questions,msg: "Questions geted with success!"})
  } catch(error) {
    return response.status(400).json({ error: error, msg: "Unexpected error!"})
  }
})

router.delete('/questions', async(request, response) => {
  try {
    const question_id = request.body.id
    const questions_deleted: any = await delete_questions(Number(question_id))
    if(!questions_deleted || questions_deleted.length < 1) return response.status(400).json({ error: "Not possibilty delete this question", msg: "Unexpected error!"})
    return response.status(200).json({ msg: "Questions deleted with success."})
  } catch(error) {
    return response.status(400).json({ error: error, msg: "Unexpected error!"})
  }
})

export default router