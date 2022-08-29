import { Link } from 'react-router-dom'
import './rules.css'

const Rules = () => {

  return (
    <div className='rules model'>
      <div className='rules_title'>Some Rules of this Quiz.</div>
      <div className='rules_body'>
        <div className='rule'>1. You will have only <span>15 seconds</span> per each quesion.</div>
        <div className='rule'>2. Once you select your answer, it can't be undone.</div>
        <div className='rule'>3. You can't select any option one time goes off.</div>
        <div className='rule'>4. you can't exit from the Quiz while you're playing.</div>
        <div className='rule'>5. You'll get points on the basis of your correct answers.</div>
      </div>
      <div className='rules_footer'>
        <Link to='/' className='btn outline'>Exit Quiz</Link>
        <Link to='/quesions' className='btn solid'>Continue</Link>
      </div>
    </div>
  )
}

export default Rules
