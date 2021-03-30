require('dotenv').config()


const express = require('express')
const server = express()
server.use(express.json())
const cors = require('cors')

// on Heroku machine, an env variable is called "NODE_ENV" --< 'production'
if (process.env.NODE_ENV === 'development') { 
    const cors = require('cors')
    server.use(cors())
}

server.get('/', (req,res)=> {
    res.json({message:'api is up'})
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})