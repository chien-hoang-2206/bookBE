import express from 'express'

const app = express()
app.get('/',(req,res) =>{
    res.send('Express vervel app response')
})

app.listen('4096',()=>{
    console.log('app is rubgnning');
})