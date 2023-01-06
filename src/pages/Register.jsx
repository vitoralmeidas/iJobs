import { useState, useEffect } from "react"
import { Logo } from "../components"
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

            <div className="form-row">
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                    type='text'
                    value={values.name}
                    onChange={handleChange}
                    className='form-input'
                />

            <button type='submit' className="btn btn-block">Submit</button>
            </div>
        </form>
    </Wrapper>
  )
}

export default Register
