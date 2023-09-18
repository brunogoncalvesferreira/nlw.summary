import express from "express"
import cors from "cors"

import { convert } from "./covert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (req, res) => {
  try {
    const { id } = req.params

    await download(id)
    const audioConverted = await convert()

    const result = await transcribe(audioConverted)

    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.post("/summary", async (req, res) => {
  try {
    const { text } = req.body

    const result = await summarize(text)

    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.listen(3333, () => {
  console.log("Server is running on port 3333")
})
