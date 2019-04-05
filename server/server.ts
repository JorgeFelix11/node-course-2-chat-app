import path from 'path';
import express from 'express';

let app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath))
console.log(__dirname + '/../public');
console.log(publicPath);

// app.get('/', (req,res) => {
//   res.send('<h1>Hello</h1>')
// })

app.listen(port,()=>{
  console.log(`Server listening to port ${port}`)
})