import got from "got"
import { gpt3Token } from "./config.js"

const url = "https://api.openai.com/v1/completions"

export const genName = async (startingLetter, gender) => {
    const params ={
        "model": "text-davinci-002",
        "prompt": `give me 1 unique ${gender} name that starts with ${startingLetter}: `,
        "max_tokens": 30,
        "temperature": 0.9,
        "frequency_penalty": 0.5,
        "top_p": 1,
        "presence_penalty": 1
    }

    const headers = {
        "Authorization": `Bearer ${gpt3Token}`
    }

    try {
        const response = await got.post(url, {json: params, headers: headers}).json()
        return response.choices[0].text.replace(/[\r\n]/gm, '')
    } catch (error) {
        console.error(error)
    }

}
