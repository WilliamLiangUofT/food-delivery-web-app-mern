import { useState } from 'react';
import './loginPopup.css'
import { assets } from '../../assets/assets';
import { useSelector, useDispatch } from "react-redux";
import { setUserField } from '../../slices/userSlice';

function LoginPopup({setShowLoginPopup}) {

    const [signUpFlag, setSignUpFlag] = useState(true);

    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onDataChangeHandler = (e) => {
        const input_name = e.target.name;
        const input_value = e.target.value;

        dispatch(setUserField({
            fieldName: input_name,
            newValue: input_value
        }));
    }

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='sign-up-login-top'>
                    <h3>{signUpFlag ? 'Sign Up' : 'Login'}</h3>
                    <img className='close-icon' src={assets.close} onClick={() => setShowLoginPopup(false)}/>
                </div>
                <div className='input-boxes-log'>
                    {signUpFlag ? <input type="text" name="name" onChange={onDataChangeHandler} value={userData.name} placeholder='Your name' required/> : <></>}
                    <input type="email" name="email" onChange={onDataChangeHandler} value={userData.email} placeholder='Your email' required/>
                    <input type="password" name="password" onChange={onDataChangeHandler} value={userData.password} placeholder='Password' required/>
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