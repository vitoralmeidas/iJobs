import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'

const Navbar = () => {
  const { toogleSidebar } = useAppContext()

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
          <button className='btn' onClick={() => console.log('show logout')}>
            <FaUserCircle />
            Vitor
            <FaCaretDown />
          </button>
          <div className='dropdown show-dropdown'>
            <button
              className='dropdown-btn'
              onClick={() => console.log('logout user')}
              type='button'
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar
