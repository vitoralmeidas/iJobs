import { useState, useEffect } from "react"
import { Logo,FormRow } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
}

const Register = () => {

    const [values, setValues] = useState(initialState)

    const handleChange = (e) => {
        console.log(e.target)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

  return (
    <Wrapper className='full-page'>
        <form className="form" onSubmit={onSubmit}>
            <Logo  />
            <h3>Login</h3>
            
            {/* name input */}
            <FormRow 
                name='name'
                type='text' 
                handleChange={handleChange} 
                value={values.name} 
            />

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
        </form>
    </Wrapper>
  )
}

export default Register
