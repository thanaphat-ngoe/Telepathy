import './Navbar.css'
import profileUser from '../assets/profile1.jpg'

const Navbar = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div>
          <div className="navbar">
            <div className="profile">
                <img src={profileUser} />
                <p>UserID</p>
            </div>
            <div className="back-btn">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 26H4.66667C3.95942 26 3.28115 25.719 2.78105 25.219C2.28095 24.7189 2 24.0406 2 23.3333V4.66667C2 3.95942 2.28095 3.28115 2.78105 2.78105C3.28115 2.28095 3.95942 2 4.66667 2H10M19.3333 20.6667L26 14M26 14L19.3333 7.33333M26 14H10" stroke="#303030" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
          </div>
          <div className="tb-container">
            <form className='tb-form' onSubmit={handleSubmit}>
                <input type="text" ></input>
                <button className='tb-btn' type='submit'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_53_42)">
                        <path d="M18.3332 1.66666L9.1665 10.8333M18.3332 1.66666L12.4998 18.3333L9.1665 10.8333M18.3332 1.66666L1.6665 7.49999L9.1665 10.8333" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_53_42">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
            </form>
          </div>
        </div>
    )
}

export default Navbar;