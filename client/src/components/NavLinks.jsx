import { NavLink } from 'react-router-dom'
import links from '../utils/links'

const NavLinks = ({ toggleSideBar }) => {
  return (
    <div className='nav-links'>
      {links.map(link => {
        const { text, id, path, icon } = link
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSideBar}
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
  )
}
export default NavLinks
