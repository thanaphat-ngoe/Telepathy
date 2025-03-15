import './Navbar.css'
import profileUser from '../assets/profile1.jpg'

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="profile">
                <img src={profileUser}></img>
                <p>UserID</p>
            </div>
            <div className="back-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H12M21.3333 22.6667L28 16M28 16L21.3333 9.33333M28 16H12" stroke="#303030" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    )
}

export default Navbar;