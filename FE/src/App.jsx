import { Routes, Route } from 'react-router-dom'
import './App.css'
import StoryBook from './Pages/StoryBook/StoryBook'
import Home from './Pages/Home/Home'
import { AuthProvider } from './AuthContext.jsx';
import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <AuthProvider>
    <div className='app'>
      <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/storybook/*" element={ <PrivateRoute> <StoryBook /> </PrivateRoute>} />
      </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
