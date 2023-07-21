import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavbarLayout } from './layout/NavbarLayout'
import { Home } from './Home'
import { Announcement } from './Announcement'
import { User } from './User'
import { AdminInfo } from './AdminInfo'
import { Login } from './auth/Login'
import { Signup } from './auth/Signup'
import { AuthLayout } from './layout/AuthLayout'
import { PrivateRoute } from './component/PrivateRoute'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PrivateRoute />}>
            <Route path='/' element={<NavbarLayout />}>
              <Route index element={<Home />}  />
              <Route path='/announcement' element={<Announcement />}  />
              <Route path='/user' element={<User />}  />
              <Route path='/admin' element={<AdminInfo />}  />
            </Route>
          </Route>
          <Route path='/login' element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path='signup' element={<Signup />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
