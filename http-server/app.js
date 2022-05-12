const express = require('express')
const { exec } = require('child_process');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    exec('ls | grep js', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`${stdout}`);
            // console.log(`stderr: ${stderr}`);
        }
    })
  res.send('Job in progress')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
