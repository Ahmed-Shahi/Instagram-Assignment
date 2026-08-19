import './App.css'
import Login from './Components/Login'
import LoginRight from './Components/Login-Right'
function App() {

  return (
    <>
      <div className='main-container'>
        <div className='left-container'>
          <LoginRight />
        </div>
        <div className='right-container'>
          <Login />
        </div>
      </div>
    </>
  )
}

export default App
