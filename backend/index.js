const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send(`
  <!doctype HTML>
  <html>
  <body>
  <div style="margin-top:60px;text-align:center;">The Microblog will be launched here in the spring of 2024. Stay tuned!</div>    
  </body>
  </html>`)
})

app.listen(port, () => {
  console.log(`Microblog server listening on port ${port}`)
})