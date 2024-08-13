import { Routes, Route } from 'react-router-dom'
import './App.css'
import StoryBook from './Pages/StoryBook/StoryBook'
import Home from './Pages/Home/Home'
import { AuthProvider } from './AuthContext.jsx';
import PrivateRoute from './PrivateRoute';
import { useEffect, useState } from 'react';

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.outerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.outerWidth <= 1024);
      setIsSmallScreen(window.innerHeight <= 600)
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <AuthProvider>
    {isSmallScreen && 
      <div className='sizemodal'>
        <div>화면을 가로로 돌려주시거나<br></br> 큰 화면에서 이용해 주세요
        </div>
      </div>
      }
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
