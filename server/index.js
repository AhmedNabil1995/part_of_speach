const express = require('express');
const {data} = require('./data.js');
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express();
let numberOfQuesions = 10;
app.use(express.json());
app.use(cors())

const getRandomQuesion =()=>{
    let randomIndex = Math.floor(Math.random()*(data.wordList.length-1))
    return data.wordList[randomIndex];
}

app.get('/quesions',(req,res)=>{
    const quesions = [];
    let pos = ['noun','verb','adverb','adjective'];
    let randomQuesion;

    pos.forEach((el)=>{
        do{
            randomQuesion = getRandomQuesion();
        }while(randomQuesion['pos']!=el)
        
        quesions.push(randomQuesion)
    })

    do{
        randomQuesion = getRandomQuesion();

        if(!quesions.includes(randomQuesion)){
                quesions.push(randomQuesion);
        }

    }while(quesions.length<numberOfQuesions)


    res.json(quesions);
})

app.post('/rank/',(req,res)=>{
    let score = req.body.score;
    let scoreAsPercentage = Math.round((score/numberOfQuesions)*100);
    let rankArr = data.scoresList.filter((el)=>{
        return el < scoreAsPercentage
    })
    let rank = Math.round((rankArr.length / data.scoresList.length)*100)
    res.json(rank);
})


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`) 
})