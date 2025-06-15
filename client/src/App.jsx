import FloatingShap from "./components/FloatingShap"
import {Routes, Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage"
import SignInPage from "./Pages/SignInPage"
import SignUpPage from "./Pages/SignUpPage"
import EmailVerificationPage from "./Pages/EmailVerificationPage"


function App() {
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden ">
    <FloatingShap color='bg-green-500' size='size-64' top='-5%' left='10%' delay={0} />
    <FloatingShap color='bg-green-500' size='size-48' top='70%' left='80%' delay={5} />
    <FloatingShap color='bg-green-500' size='size-32' top='40%' left='-5%' delay={2} />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/sign-up" element={<SignUpPage/>} />
      <Route path="/sign-in" element={<SignInPage/>} />
      <Route path="/verify-email" element={<EmailVerificationPage/>} />


    </Routes>
  </div>
}

export default App
