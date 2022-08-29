import './quesion.css';
import {useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Quesion = () => {
  let [quesions,setQuesions] = useState([]);
  let [currentQuesionNum,setCurrentQuesionNum] = useState(1);
  let [showNextBtn,setShowNextBtn] = useState(false);
  let [score,setScore] = useState(0);
  let options = useRef()
  let [timeLeft,setTimeLeft] = useState(10);
  var timer;
  let navigate = useNavigate()

  useEffect(()=>{
    const getQuesions = async()=>{
      let res = await axios.get('http://localhost:5000/quesions');
      setQuesions(res.data);
      if(!timer)
      startTimer()
    }
    getQuesions()
  },[])


  const startTimer=()=>{
    let time=10;
    setTimeLeft(time);
    /* timer = setInterval(()=>{
      if(time>0){
        setTimeLeft(--time);
      }else{
        clearInterval(timer);
        setShowNextBtn(true)
        addDisableClass()
      }
      console.log(timer)
    },1000) */
  }


  const nextQuesion =()=>{
    if(currentQuesionNum<quesions.length){
      setCurrentQuesionNum(currentQuesionNum+1);
      removeClasses();
      setShowNextBtn(false)
      startTimer()
  }
  }

  const removeClasses =()=>{
    Array.from(options.current.children).forEach((el)=>{
      el.classList.remove('correctAnswer')
      el.classList.remove('wrongAnswer')
      el.classList.remove('disableSelection')
    })
  }

  const addDisableClass =()=>{
    Array.from(options.current.children).forEach((el)=>{
      el.classList.add('disableSelection')
    })
  }

  const selectAnswer=(e)=>{
    console.log(timer)
    clearInterval(timer)
    addDisableClass()

    if(e.target.textContent === quesions[currentQuesionNum-1]['pos']){
      e.target.classList.add('correctAnswer');
      setScore(score+1)
    }else{
      e.target.classList.add('wrongAnswer');
    }


    if(currentQuesionNum===quesions.length){

      setTimeout(() => {
        localStorage.setItem('score',score)
        navigate('/result')
      }, 1500);

    }else{
      setShowNextBtn(true)
    }
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
        <div className='quesion_body_options' ref={options}>
            <div className='option' onClick={selectAnswer}>noun</div>
            <div className='option' onClick={selectAnswer}>verb</div>
            <div className='option' onClick={selectAnswer}>adverb</div>
            <div className='option' onClick={selectAnswer}>adjective</div>
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
