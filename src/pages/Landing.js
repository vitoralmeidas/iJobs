import { Link } from 'react-router-dom'
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        Job <span>Tracking</span> App
                    </h1>
                    <p>
                        I'm baby tofu Brooklyn sriracha microdosing scenester locavore.
                        Cronut art party literally kogi cray, fam copper mug butcher YOLO
                        selfies.
                    </p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}
export default Landing
