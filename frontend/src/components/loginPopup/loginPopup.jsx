import { useState } from 'react';
import './loginPopup.css'
import { assets } from '../../assets/assets';

function LoginPopup({setShowLoginPopup}) {

    const [signUpFlag, setSignUpFlag] = useState(true);

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='sign-up-login-top'>
                    <h3>{signUpFlag ? 'Sign Up' : 'Login'}</h3>
                    <img className='close-icon' src={assets.close} onClick={() => setShowLoginPopup(false)}/>
                </div>
                <div className='input-boxes-log'>
                    {signUpFlag ? <input type="text" placeholder='Your name' required/> : <></>}
                    <input type="email" placeholder='Your email' required/>
                    <input type="password" placeholder='Password' required/>
                    <button className='create-acc-log-in'>{signUpFlag ? 'Create account' : 'Login'}</button>
                    
                    {
                        signUpFlag ? <p>Already have an account? <span onClick={() => setSignUpFlag(false)}>Login here</span></p> : 
                        <p>New to Foodi? <span onClick={() => setSignUpFlag(true)}>Click here</span></p>
                    }
                    
                    
                </div>
            </form>
            

        </div>
    );
}

export default LoginPopup;