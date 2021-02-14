import React from 'react';
import WorkBCLogo from '../images/workbc-header-logo.svg'
import HeroImage from '../images/hero-image.jpg'

function Header() {
	return (
		<>
		<div className="header">
			<div className="container">
				<div className="header__logo">
					<a href="https://www.workbc.ca">
						<img className="header__logo" src={WorkBCLogo} alt="Work BC" />
					</a>
				</div>
			</div>
			{/* Header Hero Image */}
			<div className="header__hero" style={{
				backgroundImage: "url(" + HeroImage + ")",
				backgroundPosition: 'top',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}>
				<div className="container">
					<div className="header__hero-text">
						Career Search Tool
					</div>
				</div>
			</div>
		</div>     
		</>
	)
}

export default Header
