import React from 'react'

const login = () => {

    const handleSubmit = async (e) => {    
        e.preventDefault()    
        // await login(dispatch, { email, password})        
      }  

    return (
        <div>
            <form>
            <h1>Login</h1>
    
            <div>
                <label>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    // value={email}
                    placeholder='Enter your email'
                    // onChange={onChange}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    // value={password}
                    placeholder='Enter password'
                    // onChange={onChange}
                />
            </div>
    
            <button onClick={handleSubmit}>SUBMIT</button>                                                  
            </form>   
        </div>
    )
}

export default login