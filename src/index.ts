import express from 'express';
import {sendMail} from './mail'
import bodyParser from 'body-parser'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/sendMail',(req,res)=>{
	const client = req.body.client as string; 
	console.log(client)
	sendMail(client)
	.then((data)=>{
	    res.json(data)
	})
	.catch((err)=>{
		res.send(err)
	})
})


app.listen(3000,()=>{
	console.log("server started")

})

