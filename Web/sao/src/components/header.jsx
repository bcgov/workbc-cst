import React from 'react';
import WorkBCLogo from '../images/workbc-header-logo.svg'
import HeroImage from '../images/hero-image.png'

function Header() {
	return (
		<>
		<div className="header">
			<div className="container">
				<div className="header__logo">
					<a href="https://www.workbc.ca" target="_blank" rel="noreferrer">
						<img className="header__logo--img" src={WorkBCLogo} alt="Work BC" />
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
						<div className="header__hero-text--header">
							Career Search Tool
						</div>
						<div className="header__hero-text--body">
							What kinds of careers suit you best?<br />
							Search career opportunities that fit your<br />
							personality and goals
						</div>
					</div>
				</div>
			</div>
		</div>     
		</>
	)
}

export default Header
