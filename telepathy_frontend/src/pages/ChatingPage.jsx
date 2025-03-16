import './ChatingPage.css'
import Navbar from '../components/Navbar'
import userProfile from '../assets/profile1.jpg'

const ChatingPage = () => {

    const myID = 'KL3475'
    const message = [
        {
            text: 'that looks so good!',
            userid: 'KL3475'
        },
        {
            text: 'or we could make this?',
            userid: 'TN3449'
        }
    ]
    return(
        <div>
            <Navbar />
            <div className="chatbox-container">
                <div className="other-message">
                    <img src={userProfile} />
                    <div className="other-text">
                        <p>that looks so good!</p>
                    </div>
                </div>
                <div className="my-message">
                    <div className="my-text">
                        <p>or we could make this?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatingPage;