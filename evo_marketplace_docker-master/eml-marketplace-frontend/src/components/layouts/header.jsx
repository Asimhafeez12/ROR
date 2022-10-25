import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Badge, Affix } from 'antd';
import AuthenticatedMenu from './authenticated_menu';
import logo from '../../images/logo-black-beta.svg';
import * as unreadMessagesActions from './../../actions/unread_messages';
import * as notificationActions from './../../actions/notifications';
import Defender from './../../helpers/defender';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false  
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

  componentWillMount() {
  	if (Defender.currentUser()){
  		this.props.fetchNotifications();
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
	}
  }

  mark_notification_as_read(obj_notification_id, e) {
  	this.props.updateNotificationStatus(obj_notification_id);
  }
  

    toggleMenu() {
        this.setState({visible: !this.state.visible})
        {!this.state.visible ?
			document.body.classList.add('menu-opened')
        :
			document.body.classList.remove('menu-opened')
        }
    }

	render() {
		const { currentUser } = this.props.auth;
		const { total_unread_messages } = this.props.unread_messages_reducer;
		const { unread_counts } = this.props.notifications_reducer;
		return (
		<Affix>
			<Layout.Header className="main-header">
				<div className="header-holder">
					<div className="logo-holder">
						<div className="logo">
							{ this.props.auth.isAuthenticated ?	
								<React.Fragment>
									{Defender.currentUser()._r.includes("freelancer") ?
										<a href="/freelancer"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
									: 	<a href="/client"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
									}
								</React.Fragment>
							:
								<a href="/"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
							}
						</div>
					</div>
					{
						this.props.auth.isAuthenticated ?	
						<AuthenticatedMenu />
						:
						<div className="nav-holder2">
							<nav className="main-navigation">
							  <Menu>
								<Menu.Item><a href="/how-it-work">How it works</a></Menu.Item>
								<Menu.Item><a href="/evaluation">Our evaluation process</a></Menu.Item>
								<Menu.Item><a href="http://blog.wurker.ai/">Blog</a></Menu.Item>
							  </Menu>
							</nav>

							<div className="login-btn-holder">
								<Menu theme='light' mode="horizontal">
									<Menu.Item className="ai-freelancer-btn" key="3"><Link to="/for-freelancers">Freelancer?</Link></Menu.Item>
									<Menu.Item className="sign-in-btn" key="2"><Link to="/sign_in">Login</Link></Menu.Item>
									<Menu.Item className="sign-up-btn" key="1"><Link to="/job_creation">Post A Job</Link></Menu.Item>
								</Menu>
							</div>
						</div>
					}

					<div className="nav-mobile-menu">
						<div className="navigation-header">
							<Button onClick={this.toggleMenu} className="main-menu-btn">
								<span className="mobile-span mobile-span1"></span>
								<span className="mobile-span mobile-span2"></span>
								<span className="mobile-span mobile-span3"></span>
							</Button>
							<div className="mobile-logo">
								{ this.props.auth.isAuthenticated ?	
									<React.Fragment>
										{Defender.currentUser()._r.includes("freelancer") ?
											<a href="/freelancer"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
										: 	<a href="/client"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
										}
									</React.Fragment>
								:
									<a href="/"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
								}
							</div>
							<a href="/job_creation" className="join-as-btn">Post A Job</a>
						</div>
						{this.state.visible && 
							<nav className="main-navigation-dropdown" id={this.state.disabled}>
								<div className="main-navigation-top">
									<Menu>
										{ this.props.auth.isAuthenticated ?
											<Menu.Item>
												{ Defender.currentUser()._r.includes("freelancer") ?
													<a href="/freelancer">Home</a>
												: 	<a href="/client">Home</a>
												}
											</Menu.Item>
										:
											<Menu.Item><a href="/">Home</a></Menu.Item>
										}
										{
											this.props.auth.isAuthenticated ?
												<React.Fragment>
													<Menu.Item className="ant-menu-item"><a href="/jobs">Jobs</a></Menu.Item>
													<Menu.Item className="ant-menu-item">
														{total_unread_messages !== false && total_unread_messages > 0 ? 
															<a href="/messages">View all Messages<Badge className="unread-msg-on-mobile" count={total_unread_messages}></Badge></a>
														: "" }
														{total_unread_messages !== false && total_unread_messages === 0 ? 
															<a href="/messages">View all Messages</a>
														: "" }
													</Menu.Item>
													{unread_counts !== false && unread_counts > 0 ? 
														<Menu.Item className="ant-menu-item"><a href="/all_notifications" onClick={this.mark_notification_as_read.bind(this,1)}>View all Notifications<Badge className="unread-msg-on-mobile" count={unread_counts}></Badge></a></Menu.Item>
													: "" }
													{unread_counts !== false && unread_counts === 0 ? 
														<Menu.Item className="ant-menu-item"><a href="/all_notifications">View all Notifications</a></Menu.Item>
													: "" }
												</React.Fragment>
											:
												<React.Fragment>
													<Menu.Item className="ant-menu-item"><a href="/how-it-work">How it works</a></Menu.Item>
													<Menu.Item className="ant-menu-item"><a href="/evaluation">Our evaluation process</a></Menu.Item>
													<Menu.Item className="ant-menu-item"><a href="http://blog.wurker.ai/">Blog</a></Menu.Item>
													<Menu.Item className="ant-menu-item"><a href="/for-freelancers">Freelancer?</a></Menu.Item>
												</React.Fragment>
										}
									</Menu>
								</div>

								{
									this.props.auth.isAuthenticated && currentUser._r.includes("freelancer") ?
										<React.Fragment>
										</React.Fragment>
									:
									<div className="main-navigation-bottom">
										{
											this.props.auth.isAuthenticated ?
												<React.Fragment>
													{
														currentUser._r.includes("client") ?
															<Button href="/job_creation" type="primary" className="post-job-btn">Post a Job</Button>
														:											
														<React.Fragment>
														</React.Fragment>
													}
												</React.Fragment>
											:
												<Button href="/sign_in" className="login-btn">Login</Button>
										}
									</div>
								}
							</nav>
						}
					</div>
				</div>
			</Layout.Header>
		</Affix>
		)
	}
}

function mapStateToProps(state) {
	return {
	    my_jobs_reducer: state.my_jobs_reducer,
		auth: state.auth,
		unread_messages_reducer: state.unread_messages_reducer,
		notifications_reducer: state.notifications_reducer,
	};
}

function mapDispatchToProps(dispatch) {
  return {

	updateNotificationStatus: (notification_id) => {
	  dispatch(notificationActions.markNotification_as_read(notification_id))
	},
	fetchUnreadMessagesCount: (user_id) => {
	  dispatch(unreadMessagesActions.fetch(user_id))
	},
	fetchNotifications: () => {
	  dispatch(notificationActions.fetchNotifications())
	},

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
