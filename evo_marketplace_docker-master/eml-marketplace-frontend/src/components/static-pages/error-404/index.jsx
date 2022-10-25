import React, { Component } from 'react';
import errorImage from './../../../images/error-image.png';

class Error404 extends Component{
	render(){
		document.body.classList.add("error-page");
		return(
			<div className="error404-page">
				<div className="image-holder">
					<img src={errorImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
				</div>
				<h2>Looks like you've got lost…</h2>
				<p>The page you're looking for doesn't exist or has been moved.</p>
			</div>
		);
	}
}

export default Error404;