import './result.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Result = () => {
  let [rank,setRank] = useState()

  useEffect(()=>{
    const getRank =async()=>{
      let score = localStorage.getItem('score')
      const res = await axios.post('http://localhost:5000/rank',{score})
      setRank(res.data);
    }
    getRank();
  },[])
  return (
    <div className='result_container model'>
      <div className='result_icon'><i className="fa-solid fa-crown"></i></div>
      <div className='result_final'>
      <p>You've completed the Quiz</p>
      <p className='result_rank'>your rank is {rank}%</p>
      </div>
      <div className='result_btn_group'>
        <Link to='/quesions' className='btn outline'>Replay Quiz</Link>
        <Link to='/' className='btn solid'>Quit Quiz</Link>
      </div>
    </div>
  )
}

export default Result
