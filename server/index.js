const express = require('express');
const {data} = require('./data.js');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 5000
let numberOfQuesions = 10;

const app = express();

app.use(express.json());
app.use(cors())

const getRandomQuesion =()=>{
    let randomIndex = Math.floor(Math.random()*(data.wordList.length-1))
    return data.wordList[randomIndex];
}

//endpoint that return randomly 10 quesions
app.get('/quesions',(req,res)=>{
    const quesions = [];
    let pos = ['noun','verb','adverb','adjective'];
    let randomQuesion;

    //Choose four random questions that contain a noun, a verb, an adjective, and an adverb
    pos.forEach((el)=>{
        do{
            randomQuesion = getRandomQuesion();
        }while(randomQuesion['pos']!=el)
        
        quesions.push(randomQuesion)
    })

    //Choose six other random questions on condition they are not in the quesions Array
    do{
        randomQuesion = getRandomQuesion();

        if(!quesions.includes(randomQuesion)){
                quesions.push(randomQuesion);
        }

    }while(quesions.length<numberOfQuesions)


    res.json(quesions);
})

//enpoint that return the rank
app.post('/rank/',(req,res)=>{
    let score = req.body.score; // a number from 0 to 10 (number of correct answer)
    // convert this number to percentage
    let scoreAsPercentage = Math.round((score/numberOfQuesions)*100);
    //get scorelist that less than the score percentage
    let rankArr = data.scoresList.filter((el)=>{
        return el < scoreAsPercentage
    })
    // get the rank percentage then return it
    let rank = Math.round((rankArr.length / data.scoresList.length)*100)
    res.json(rank);
})


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`) 
})