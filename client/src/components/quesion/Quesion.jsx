import './quesion.css';
import {useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Quesion = () => {

  let [quesions,setQuesions] = useState([]);
  let [currentQuesionNum,setCurrentQuesionNum] = useState(1);
  let [showNextBtn,setShowNextBtn] = useState(false); // show or hide next button
  let [score,setScore] = useState(0);
  let optionsContainer = useRef(); 
  let [timeLeft,setTimeLeft] = useState(10);
  let timer = useRef() // the id returned from the setInterval
  let navigate = useNavigate()

  //fetch quesions from the API
  useEffect(()=>{
    const getQuesions = async()=>{
      let res = await axios.get(`http://localhost:5000/quesions`);
      setQuesions(res.data);
        // then srart the timer to count from 10 to 0
        startTimer()

    }
    getQuesions()
  },[])

  //counting from 10 to 0
  const startTimer=()=>{

    let time=10;
    setTimeLeft(time); // reset timeLeft every time this function called

    if(timer.current) return // this ensure that you can,t set more than one timer at once until the variable timer set to undefined

    timer.current = setInterval(()=>{
      if(time>0){
        setTimeLeft(--time);
      }else{
        stopTimer()
        getNextQuesionOrEndQuiz();
        disableSelectionOfOption()
      }
    },1000)

  }

  const stopTimer =()=>{
    clearInterval(timer.current);
    timer.current = undefined;
  }



  const disableSelectionOfOption =()=>{
    Array.from(optionsContainer.current.children).forEach((el)=>{
      el.classList.add('disableSelection')
    })
  }

  function getNextQuesionOrEndQuiz(){
 
    if(currentQuesionNum===quesions.length){
      //quesions is finished so, navigate to result screen to show your rank
      setTimeout(() => {
        localStorage.setItem('score',score)
        navigate('/result')
      }, 1500);

      //show next button to get the next quesion
    }else{
      setShowNextBtn(true)
    }
  }

  const removeClassesFromOptions =()=>{
    Array.from(optionsContainer.current.children).forEach((el)=>{
      el.classList.remove('correctAnswer')
      el.classList.remove('wrongAnswer')
      el.classList.remove('disableSelection')
    })
  }

  const nextQuesion =()=>{
    setCurrentQuesionNum(++currentQuesionNum);
    removeClassesFromOptions();
    setShowNextBtn(false)
    startTimer()  
}

  const checkAnswer=(e)=>{
    
    stopTimer()
    disableSelectionOfOption()

    //check if your answer is correct or not
    if(e.target.textContent === quesions[currentQuesionNum-1]['pos']){
      e.target.classList.add('correctAnswer');
      setScore(++score)
    }else{
      e.target.classList.add('wrongAnswer');
    }

    getNextQuesionOrEndQuiz()
   
  }


  return (
    <div className='quesion model'>

      <div className='quesion_header'>
        <div className='quesion_header_title'>Awesome Quiz Application</div>
        <div className='quesion_header_timer'>
            <span>Time Left</span>
            <span className='time'>{timeLeft<10?'0'+timeLeft:timeLeft}</span>
        </div>
        <div className='quesion_header_progress_container'>
        <div className='quesion_header_progress' style={{width:`${(currentQuesionNum/quesions.length)*100}%`}}></div>
        </div>
      </div>

      <div className='quesion_body'>
        <h2>{currentQuesionNum}. {quesions[currentQuesionNum-1]?.['word']}</h2>
        <div className='quesion_body_options' ref={optionsContainer}>
            <div className='option' onClick={checkAnswer}>noun</div>
            <div className='option' onClick={checkAnswer}>verb</div>
            <div className='option' onClick={checkAnswer}>adverb</div>
            <div className='option' onClick={checkAnswer}>adjective</div>
        </div>
      </div>

      <div className='quesion_footer'>
        <div className='quesion_number'>{currentQuesionNum} of {quesions.length} quesions</div>
        {showNextBtn&&<button className='btn solid' onClick={nextQuesion}>next</button>}
      </div>

    </div>
  )
}

export default Quesion
