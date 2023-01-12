import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Logo, FormRow, Alert } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { useAppContext } from "../context/appContext"

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
 }

const Register = () => {
    const { isLoading, showAlert, displayAlert, setUpUser, user } = useAppContext()
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    useEffect(()=>{

        if (user !== null) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }

    }, [user, navigate])

    const onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values;
        if (!email || !password || (!isMember && !name )) {
            displayAlert()
            return
        }
        const currentUser = {name, email , password}
        if (isMember) {
            console.log("already a member")
            setUpUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful! Redirecting...'
            })
        } else {
            setUpUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User Created! Redirecting...'            
            })
        }
    }

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember})
    };

  return (
    <Wrapper className='full-page'>
        <form className="form" onSubmit={onSubmit}>
            
            <Logo  />

            <h3>{values.isMember ? "Login": 'Register'}</h3>

            {showAlert && <Alert /> }

            {!values.isMember && (
                <FormRow 
                    type='text'
                    value={values.name}
                    handleChange={handleChange}
                    name='name'
                />
            )}

            {/* email input */}
            <FormRow 
                name='email'
                type='text' 
                handleChange={handleChange} 
                value={values.email} 
            />

            {/* password input */}
            <FormRow 
                name='password'
                type='password' 
                handleChange={handleChange} 
                value={values.password} 
            />

            <button type='submit' className="btn btn-block" disabled = {isLoading} >Submit</button>

            {/* toogle button */}
            <p>
                {values.isMember ? 'Not a member yet ?' : 'Already a member'}

                <button type='button' onClick={toggleMember} className='member-btn'>{
                    values.isMember? 'Register': 'Login'}
                </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register
