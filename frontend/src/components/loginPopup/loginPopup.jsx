import { useContext, useState } from 'react';
import './loginPopup.css'
import { assets } from '../../assets/assets';
import { useSelector, useDispatch } from "react-redux";
import { setUserField } from '../../slices/userSlice';
import { useRegisterUserMutation, useLoginUserMutation } from '../../slices/apiSlice';
import { GlobalContext } from '../../context/ContextStore';
import { useNavigate } from 'react-router';

function LoginPopup({setShowLoginPopup}) {

    const [signUpFlag, setSignUpFlag] = useState(true);
    const [invalidLoginFlag, setInvalidLoginFlag] = useState(false);
    const [invalidCreateAccFlag, setInvalidCreateAccFlag] = useState(false);

    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ registerUser ] = useRegisterUserMutation();
    const [ loginUser ] = useLoginUserMutation();

    const { setUserSignedIn } = useContext(GlobalContext);

    const onDataChangeHandler = (e) => {
        const input_name = e.target.name;
        const input_value = e.target.value;

        dispatch(setUserField({
            fieldName: input_name,
            newValue: input_value
        }));
    };

    const onCreateAccountHandler = async (e) => {
        e.preventDefault();
        const userPayload = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        };

        try {
            const response = await registerUser(userPayload).unwrap();
            if (response.success) {
                setShowLoginPopup(false);
                setUserSignedIn(true);
                navigate('/');
            } else {
                setInvalidCreateAccFlag(true);
            }
        } catch (error) {
            console.log("ERROR");
        }
        
    };

    const onLoginHandler = async (e) => {
        e.preventDefault();
        const userPayload = {
            email: userData.email,
            password: userData.password
        };

        try {
            const response = await loginUser(userPayload).unwrap();
            if (response.success) {
                setShowLoginPopup(false);
                setUserSignedIn(true);

                dispatch(setUserField({
                    fieldName: 'name',
                    newValue: response.userInfo.name
                }));

                navigate('/');

            } else {
                setInvalidLoginFlag(true);
            }
        } catch (error) {
            console.log("ERROR");
        }
    };

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
                    
                    {invalidCreateAccFlag ? <p className='invalid-auth'>Duplicate email. Account creation unsuccessful</p> : <></>}
                    {invalidLoginFlag ? <p className='invalid-auth'>Invalid email or password</p> : <></>}
                    
                    {signUpFlag ? <button className='create-acc-log-in' onClick={onCreateAccountHandler}>Create account</button> : <button className='create-acc-log-in' onClick={onLoginHandler}>Login</button>}
                    
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