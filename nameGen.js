import got from "got"
import dotenv from "dotenv"


dotenv.config()
const url = "https://api.openai.com/v1/completions"

const NAME_TYPES = ["", "Italian", "German", "British", "American", "Spanish", "Greek"]

const randomPickNameType = () => {
    const randomIndex = Math.floor(Math.random() * NAME_TYPES.length)
    return NAME_TYPES[randomIndex]
}

export const genName = async (startingLetter, gender) => {
    const params ={
        "model": "text-davinci-002",
        "prompt": `give me 1 unique ${randomPickNameType()} ${gender} name that starts with ${startingLetter}: `,
        "max_tokens": 30,
        "temperature": 0.9,
        "frequency_penalty": 0.5,
        "top_p": 1,
        "presence_penalty": 1
    }

    const headers = {
        "Authorization": `Bearer ${process.env.GPT3_TOKEN}`
    }

    try {
        const response = await got.post(url, {json: params, headers: headers}).json()
        return response.choices[0].text.replace(/[\r\n]/gm, '')
    } catch (error) {
        console.error(error)
    }

}
