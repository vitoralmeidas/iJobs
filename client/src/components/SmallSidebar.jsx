import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const SmallSidebar = () => {
  const { showSideBar, toogleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button className='close-btn' onClick={toogleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map(link => {
              const { icon, text, path, id } = link
              return (
                <NavLink
                  to={path}
                  key={id}
                  onClick={toogleSidebar}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar
