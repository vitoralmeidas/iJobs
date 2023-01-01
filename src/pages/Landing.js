import logo from '../assets/images/logo.svg'
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage'


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt='job' className='logo' />
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
                    <button className='btn btn-hero'>Login/Register</button>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing
