import ytdl from "ytdl-core"
import fs from "node:fs"

// pegando o id do vídeo
export const download = (videoId) =>
  new Promise((resolve, reject) => {
    // formatamos a url do vídeo do YouTube
    const videoURL = "https://www.youtube.com/watch?v=" + videoId

    console.log("realizando o download do video:", videoId)

    // definindo padrões de qualidade do vídeo
    ytdl(videoURL, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      // buscando informações do vídeo
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        // verificando se o vídeo é maior que 60 segundos, se for geramos um erro
        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior que 60 segundos.")
        }
      })
      // verificamos quando o download é finalizado
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      // caso tenha algum erro com o download verificamos o erro
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do error:",
          error
        )
        reject(error)
      })
      // definimos onde queremos salvar o nosso arquivo
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
