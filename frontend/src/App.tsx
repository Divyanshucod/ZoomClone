
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Meeting from './components/Meeting'
import MeetingBoard from './components/MeetingBoard'
function App() {

  return (
     <BrowserRouter>
         <Routes>
           <Route path='/signin' element={<SignIn/>}></Route>
           <Route path='/signup' element={<SignUp/>}></Route>
           <Route path='/meeting/:id' element={<Meeting/>}></Route>
           <Route path='/meeting'element={<MeetingBoard/>}></Route>
         </Routes>
     </BrowserRouter>
  )
}

export default App
