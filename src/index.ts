import express from 'express';
import {sendMail} from './mail'
import bodyParser from 'body-parser'
import path from 'path'
require('dotenv').config()
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
import {statusTracker , sentArr} from './mail'
app.use(express.static(path.join(__dirname, '../views/')));
app.post('/sendMail', (req, res) => {
	if(!req.body.client){
		res.send("Please provide a client email")
		return;
	}
	else if(sentArr.includes(req.body.client)){
		res.send("Email already sent to this client")
		return;
	}
    const client = req.body.client as string;
    console.log(client);

    sendMail(client)
        .then((data) => {
            const status = statusTracker[client] || { provider: "none", retries: -1, status: "not found" };
            res.json({ status: status.status });
        })
        .catch((err) => {
            res.send(err);
        });
});

app.get('/getStatusTracker', (req, res) => {
    let component = "";
    for (const email in statusTracker) {
        if (statusTracker.hasOwnProperty(email)) {
            const status = statusTracker[email];
            component += `<div class="email-status">Email: ${email} | Provider: ${status.provider} | Retries: ${status.retries} | Status: ${status.status}</div>`;
        }
    }
    res.send(component);


});

app.get('/' , (req,res)=>{
	res.sendFile(path.join(__dirname, '../../views/index.html'));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
	console.log("server started")

})

