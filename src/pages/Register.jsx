import { useState, useEffect } from "react"
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
    const { isLoading, showAlert } = useAppContext()

    const [values, setValues] = useState(initialState)

    const handleChange = (e) => {
        console.log(e.target)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
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
                type='text' 
                handleChange={handleChange} 
                value={values.password} 
            />

            <button type='submit' className="btn btn-block">Submit</button>

            {/* toogle button */}
            <p>
                {values.isMember ? 'Not a member yet ?' : 'Already a member'}

                <button type='button' onClick={toggleMember} className='member-btn'>{
                    values.isMember? 'Login': 'Register'}
                </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register
