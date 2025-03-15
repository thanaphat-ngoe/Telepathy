import './PartnerIDPage.css'
import { useNavigate } from 'react-router-dom'

const PartnerIDPage = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/chat')
    }

    return (
        <div className="pp-container">
            <div className="pp-head">
                <p>Telepathy</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="pp-form">
                    <p>Enter your partner id</p>
                    <input type="text"></input>
                </div>
                <div className="pp-next-btn">
                    <button type="submit">Go to Chat</button>
                </div>
            </form>
        </div>
    )
}

export default PartnerIDPage;