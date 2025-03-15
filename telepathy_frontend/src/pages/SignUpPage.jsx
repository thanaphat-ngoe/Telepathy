import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/partnerid')
    }

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className="sp-container">
                <div className="sp-head">
                    <p>Telepathy</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="sp-form">
                        <p>Email</p>
                        <input type="email"></input>
                    </div>
                    <div className="sp-form">
                        <p>Password</p>
                        <input type="password"></input>
                    </div>
                    <div className="sp-form">
                        <p>Confirm Password</p>
                        <input type="password"></input>
                    </div>
                    <div className="sp-reg-btn">
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div className="sp-login-btn">
                    <button onClick={handleBack}>Login Page</button>
                </div>
            </div>
        )
}

export default SignUpPage;
