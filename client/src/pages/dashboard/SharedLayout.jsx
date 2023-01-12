import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { SmallSidebar, Navbar, BigSideBar } from '../../components'

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSideBar />
        <div>
          <Navbar />
          <div className='dashboard-page'></div>
          <Outlet />
        </div>
      </main>
    </Wrapper>
  )
}
export default SharedLayout
