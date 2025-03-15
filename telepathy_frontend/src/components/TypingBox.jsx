import './TypingBox.css'

const TypingBox = () => {
    return(
        <div className="tb-container">
            <form>
                <div className="text-field">
                    <input type="text" />
                </div>
                <div className="btn">
                    <button>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_28_40)">
                        <path d="M18.3332 1.66666L9.1665 10.8333M18.3332 1.66666L12.4998 18.3333L9.1665 10.8333M18.3332 1.66666L1.6665 7.49999L9.1665 10.8333" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_28_40">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TypingBox;