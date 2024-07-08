const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req,res) => {
    res.send('<h1>Hello API</h1>');
});

app.listen(PORT, () => {
  console.log("Listening to port 3000");
});