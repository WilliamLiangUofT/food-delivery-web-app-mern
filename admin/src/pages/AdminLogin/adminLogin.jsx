import './adminLogin.css'
import { useLoginAdminMutation } from '../../slices/adminAPISlices';
import { useState } from 'react';
import { useNavigate } from "react-router";

function AdminLogin() {

    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [invalidLoginFlag, setInvalidLoginFlag] = useState(false);

    const [loginAdmin] = useLoginAdminMutation();

    const navigate = useNavigate();

    const onButtonEventClick = async () => {
        const payload = {
            email: emailField,
            password: passwordField
        };

        const response = await loginAdmin(payload);
        console.log(response)
        if (response.data.success) {
            navigate('/addItem');
        } else {
            setInvalidLoginFlag(true);
        }
    }

    return (
        <div className='admin-login-page'>
            <h2>Admin Login</h2>
            <input type='email' placeholder='Email' value={emailField} onChange={(e) => setEmailField(e.target.value)}/>
            <input type='password' placeholder='Password' value={passwordField} onChange={(e) => setPasswordField(e.target.value)}/>
            <button onClick={onButtonEventClick}>Login</button>
            {invalidLoginFlag ? <p>Invalid email or password</p> : <></>}
        </div>
    );
}

export default AdminLogin;
