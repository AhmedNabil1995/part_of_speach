import Quesion from './components/quesion/Quesion';
import Result from './components/result/Result';
import Rules from './components/rules/Rules';
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Link className='btn primary' to='/rules'>Start Quiz</Link>}/>
        <Route path='/rules' element={<Rules />}/>
        <Route path='/quesions' element={<Quesion />}/>
        <Route path='/result' element={<Result />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
