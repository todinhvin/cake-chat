const  axios = require("axios")
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.listen(3005, () => {
    console.log('started on port 3005')
    app.post('/', async(req, res) => {
       try{
        const data = req.body;
        const response = await axios({
            method: "POST",
            url: "http://localhost:8080/cakechat_api/v1/actions/get_response",
            mode: 'no-cors',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            data,
            });
        res.json(response.data);
       }catch(err) {
           console.log(err)
           res.json(err)
       }
    })
})