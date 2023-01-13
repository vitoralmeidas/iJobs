import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'

const Navbar = () => {
  const { toogleSidebar, user, logoutUser } = useAppContext()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toogleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button className='dropdown-btn' onClick={logoutUser} type='button'>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar
