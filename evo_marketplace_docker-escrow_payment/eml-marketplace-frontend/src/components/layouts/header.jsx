import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import AuthenticatedMenu from './authenticated_menu';
import logo from '../../images/logo-black.svg';

class Header extends Component {

	render() {
		return (
			<Layout.Header className="main-header">
				<div className="header-holder">
					<div className="logo-holder">
						<div className="logo">
							<a href="/"><img src={logo} alt="Evolve Machine Learner Logo" /></a>
						</div>
					</div>
					{
						this.props.auth.isAuthenticated ?	
						<AuthenticatedMenu />
						:
						<div className="nav-holder2">
							<nav className="main-navigation">
							  <Menu>
								<Menu.Item><a href="/home">Home</a></Menu.Item>
								<Menu.Item><a href="/how-it-work">How it Works</a></Menu.Item>
								<Menu.Item><a href="/evaluation">Our Evaluation Process</a></Menu.Item>
								<Menu.Item><a href="/blog">Blog</a></Menu.Item>
							  </Menu>
							</nav>
							<div className="login-btn-holder">
								<Menu theme='light' mode="horizontal">
									<Menu.Item className="sign-up-btn" key="1"><Link to="/job/category">Post A Job</Link></Menu.Item>
									<Menu.Item className="sign-in-btn" key="2"><Link to="/sign_in">Login</Link></Menu.Item>
								</Menu>
							</div>
						</div>
					}
				</div>
			</Layout.Header>
		)
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
