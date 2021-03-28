import React , {useState, useEffect} from 'react';
import WorkBCLogo from '../images/workbc-header-logo.svg'
import useWindowSize from '../client/useWindowSize'
import {useGetSystemConfigurations} from '../client/apiService'

function Header() {
	const [backgroundImagesPath, setBackgroundImagesPath] = useState('')
	const {data: bgPathData, isValidating: isFetchingBgPath, isSettled: isBgPathFetched } = useGetSystemConfigurations({name: "BackgroundImagesPath"})
	const [width] = useWindowSize()
	
	useEffect(() => {
        if(!isFetchingBgPath && isBgPathFetched) {
            setBackgroundImagesPath(bgPathData?.value)
        }
    }, [bgPathData, isFetchingBgPath, isBgPathFetched])

	function isMobile() {
        return width < 1200
    }

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
				backgroundImage: `url(${backgroundImagesPath}hero-image${isMobile() ? '-mobile' : ''}.png)`}}>
				<div className="container">
					<div className="header__hero-text">
						<div className="header__hero-text--header">
							<span className="desktop">Career Search Tool</span>
							<span className="mobile">Career<br />Search Tool</span>
						</div>
						<div className="header__hero-text--body">
							Explore career opportunities that fit <br/> your interests and goals.
						</div>
					</div>
				</div>
			</div>
		</div>     
		</>
	)
}

export default Header
