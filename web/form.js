import { server } from "./server.js"
const form = document.getElementById("form")
const input = document.getElementById("input")
const content = document.getElementById("content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  // pegando o valor do input
  const videoURL = input.value

  // verificando se o vídeo é um short
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um short.")
  }

  // pegando somente o ID da URL do YouTube o split remove um pedaço da URL
  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  // usando o axios, como já configuramos o localhost:3333, aqui nos retorna a URL com ID do video selecionado no YouTube
  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  // nesta rota nos retorna o resumo do vídeo
  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})

// https://www.youtube.com/shorts/TFGAMLL68CA

// https://youtube.com/shorts/TFGAMLL68CA?si=JmeSbxvH3nQceXgL
