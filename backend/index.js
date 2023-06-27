const express = require('express')
const cors = require('cors')
const multer = require('multer')
const {memoryStorage} = require('multer')
const { uploadToS3, getUserPresignedUrls } = require('./s3.js')

const PORT = process.env.PORT || 3000

const app = express()
const storage = memoryStorage()
const upload = multer({storage})
const path = require('path')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'),
  (error)=> {
    if(error) res.status(500).send(err)
  })
})


app.get('/images', async (req, res) => {
    const userId = req.headers['x-user-id']

    if (!userId) return res.status(400).json({message: 'Bad Request'})

    const {error, presignedUrls} = await getUserPresignedUrls(userId)
    
    if (error) return res.status(500).json({message: error.message})

    return res.json(presignedUrls)
})

app.post('/images', cors(), upload.single("image"), (req, res) => {
    const { file } = req
    const userId = req.headers['x-user-id']

    if (!userId || !file) return res.status(400).json({message: 'Bad Request'})
    
    const {error, key } = uploadToS3({file, userId})
    
    if (error) return res.status(500).json({message: error.message})
    
    return res.status(201).json({ key })
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})