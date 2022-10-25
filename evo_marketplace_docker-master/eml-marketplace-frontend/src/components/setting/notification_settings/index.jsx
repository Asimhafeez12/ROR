import React, { Component } from 'react';
import { Select, Switch, Skeleton, message } from 'antd';
import { connect } from 'react-redux';
import * as uActions from './../../../actions/users';
import Defender from './../../../helpers/defender';
const Option = Select.Option;

class NotificationSettings extends Component{
	state = {
		button_loading: true,
		skeleton_loading: true,
	};

	componentWillMount() {
		setTimeout(() => {
			this.setState({ button_loading: false });
			this.setState({ skeleton_loading: false });
		}, 2000);
	}

	onChangeJobPostedNotify = (e) => {
	    let  data = {}
	    data["job_posted"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobPostedEmail = (e) => {
	    let  data = {}
	    data["job_posted_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobApprovedNotify = (e) => {
	    let  data = {}
	    data["job_approved"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobApprovedEmail = (e) => {
	    let  data = {}
	    data["job_approved_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeCoverLetterReceivedNotify = (e) => {
	    let  data = {}
	    data["cover_letter_received"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeCoverLetterReceivedEmail = (e) => {
	    let  data = {}
	    data["cover_letter_received_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferSentNotify = (e) => {
	    let  data = {}
	    data["job_offer_sent"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferSentEmail = (e) => {
	    let  data = {}
	    data["job_offer_sent_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferAcceptedNotify = (e) => {
	    let  data = {}
	    data["job_offer_accepted"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferAcceptedEmail = (e) => {
	    let  data = {}
	    data["job_offer_accepted_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferRejectedNotify = (e) => {
	    let  data = {}
	    data["job_offer_rejected"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferRejectedEmail = (e) => {
	    let  data = {}
	    data["job_offer_rejected_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneCreatedNotify = (e) => {
	    let  data = {}
	    data["milestone_created"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneCreatedEmail = (e) => {
	    let  data = {}
	    data["milestone_created_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeRatingGivenNotify = (e) => {
	    let  data = {}
	    data["rating_given"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeRatingGivenEmail = (e) => {
	    let  data = {}
	    data["rating_given_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeRatingReceivedNotify = (e) => {
	    let  data = {}
	    data["rating_received"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeRatingReceivedEmail = (e) => {
	    let  data = {}
	    data["rating_received_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneAgreedByFreelancerNotify = (e) => {
	    let  data = {}
	    data["milestone_agreed_by_freelancer"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneAgreedByFreelancerEmail = (e) => {
	    let  data = {}
	    data["milestone_agreed_by_freelancer_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneAcceptedNotify = (e) => {
	    let  data = {}
	    data["milestone_accepted_on_escrow"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneAcceptedEmail = (e) => {
	    let  data = {}
	    data["milestone_accepted_on_escrow_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneDeliveredByFreelancerNotify = (e) => {
	    let  data = {}
	    data["milestone_delivered"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneDeliveredByFreelancerEmail = (e) => {
	    let  data = {}
	    data["milestone_delivered_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangePaymentApprovedNotify = (e) => {
	    let  data = {}
	    data["payment_approved"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangePaymentApprovedEmail = (e) => {
	    let  data = {}
	    data["payment_approved_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneReceivedNotify = (e) => {
	    let  data = {}
	    data["milestone_received"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeMilestoneReceivedEmail = (e) => {
	    let  data = {}
	    data["milestone_received_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeInvitationReceivedNotify = (e) => {
	    let  data = {}
	    data["invitation_received"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeInvitationReceivedEmail = (e) => {
	    let  data = {}
	    data["invitation_received_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeCoverLetterSubmittedNotify = (e) => {
	    let  data = {}
	    data["cover_letter_submitted"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeCoverLetterSubmittedEmail = (e) => {
	    let  data = {}
	    data["cover_letter_submitted_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferReceivedNotify = (e) => {
	    let  data = {}
	    data["job_offer_received"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobOfferReceivedEmail = (e) => {
	    let  data = {}
	    data["job_offer_received_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobStartedNotify = (e) => {
	    let  data = {}
	    data["job_started"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobStartedEmail = (e) => {
	    let  data = {}
	    data["job_started_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobClosedNotify = (e) => {
	    let  data = {}
	    data["job_closed"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}

	onChangeJobClosedEmail = (e) => {
	    let  data = {}
	    data["job_closed_email"] = e;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}


	updateUnreadEmailSettings = (value) => {
	    let  data = {}
	    data["unread_messages_interval"] = value;
	  	this.props.dispatch(uActions.update(data)).then((res) => {
	      if (!this.props.user_view_reducer.success) {
	        this.props.dispatch(uActions.updateCurrentUser()).then( () => {
	        	message.success("Notification settings updated")
	        });
	      }
		});
	}
	

	render(){
 		return(
			<div className="notifications-holder">
				<Skeleton loading={this.state.skeleton_loading} avatar={false} title={true} paragraph={true} active>
					<h2>Notification Settings</h2>
					{Defender.currentUser()._r.includes("client") ?
						<React.Fragment>
							<div className="notifications-block">
								<table>
									<thead>
										<tr>
											<th>Jobs</th>
											<th>System</th>
											<th>Email</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>A job is posted.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_posted} onChange={this.onChangeJobPostedNotify} /></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_posted_email} onChange={this.onChangeJobPostedEmail} /></td>
										</tr>
										<tr>
											<td>A job is approved.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_approved} onChange={this.onChangeJobApprovedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_approved_email} onChange={this.onChangeJobApprovedEmail}/></td>
										</tr>
										<tr>
											<td>A cover letter is received.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().cover_letter_received} onChange={this.onChangeCoverLetterReceivedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().cover_letter_received_email} onChange={this.onChangeCoverLetterReceivedEmail}/></td>
										</tr>
										<tr>
											<td>Job offer is sent to freelancer.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_sent} onChange={this.onChangeJobOfferSentNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_sent_email} onChange={this.onChangeJobOfferSentEmail}/></td>
										</tr>
										<tr>
											<td>Job offer is accepted by freelancer.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_accepted} onChange={this.onChangeJobOfferAcceptedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_accepted_email} onChange={this.onChangeJobOfferAcceptedEmail}/></td>
										</tr>
										<tr>
											<td>Job offer is rejected by freelancer.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_rejected} onChange={this.onChangeJobOfferRejectedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_rejected_email} onChange={this.onChangeJobOfferRejectedEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is created.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_created} onChange={this.onChangeMilestoneCreatedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_created_email} onChange={this.onChangeMilestoneCreatedEmail}/></td>
										</tr>
										<tr>
											<td>A job is closed successfully.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_closed} onChange={this.onChangeJobClosedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_closed_email} onChange={this.onChangeJobClosedEmail}/></td>
										</tr>
										<tr>
											<td>Job rating is given.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_given} onChange={this.onChangeRatingGivenNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_given_email} onChange={this.onChangeRatingGivenEmail}/></td>
										</tr>
										<tr>
											<td>Job rating is received.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_received} onChange={this.onChangeRatingReceivedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_received_email} onChange={this.onChangeRatingReceivedEmail}/></td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="notifications-block">
								<table>
									<thead>
										<tr>
											<th>Escrow.com</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>A milestone is agreed by freelancer on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_agreed_by_freelancer} onChange={this.onChangeMilestoneAgreedByFreelancerNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_agreed_by_freelancer_email} onChange={this.onChangeAgreedByFreelancerEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is delivered by freelancer on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_delivered} onChange={this.onChangeMilestoneDeliveredByFreelancerNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_delivered_email} onChange={this.onChangeMilestoneDeliveredByFreelancerEmail}/></td>
										</tr>
										<tr>
											<td>You've received the milestone on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_received} onChange={this.onChangeMilestoneReceivedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_received_email} onChange={this.onChangeMilestoneReceivedEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is accepted on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_accepted_on_escrow} onChange={this.onChangeMilestoneAcceptedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_accepted_on_escrow_email} onChange={this.onChangeMilestoneAcceptedEmail}/></td>
										</tr>
										<tr>
											<td>Your payment has been approved on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().payment_approved} onChange={this.onChangePaymentApprovedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().payment_approved_email} onChange={this.onChangePaymentApprovedEmail}/></td>
										</tr>
									</tbody>
								</table>
							</div>
						</React.Fragment>
						:
						<React.Fragment>
							<div className="notifications-block">
								<table>
									<thead>
										<tr>
											<th>Jobs</th>
											<th>System</th>
											<th>Email</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>An invitation is received to submit a proposal.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().invitation_received} onChange={this.onChangeInvitationReceivedNotify} /></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().invitation_received_email} onChange={this.onChangeInvitationReceivedEmail} /></td>
										</tr>
										<tr>
											<td>A cover letter is submitted.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().cover_letter_submitted} onChange={this.onChangeCoverLetterSubmittedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().cover_letter_submitted_email} onChange={this.onChangeCoverLetterSubmittedEmail}/></td>
										</tr>
										<tr>
											<td>A job offer is received.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_received} onChange={this.onChangeJobOfferReceivedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_offer_received_email} onChange={this.onChangeJobOfferReceivedEmail}/></td>
										</tr>
										<tr>
											<td>A job is started.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_started} onChange={this.onChangeJobStartedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_started_email} onChange={this.onChangeJobStartedEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is created.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_created} onChange={this.onChangeMilestoneCreatedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_created_email} onChange={this.onChangeMilestoneCreatedEmail}/></td>
										</tr>
										<tr>
											<td>A job is closed by client.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_closed} onChange={this.onChangeJobClosedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().job_closed_email} onChange={this.onChangeJobClosedEmail}/></td>
										</tr>
										<tr>
											<td>Job rating is given.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_given} onChange={this.onChangeRatingGivenNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_given_email} onChange={this.onChangeRatingGivenEmail}/></td>
										</tr>
										<tr>
											<td>Job rating is received.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_received} onChange={this.onChangeRatingReceivedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().rating_received_email} onChange={this.onChangeRatingReceivedEmail}/></td>
										</tr>
									</tbody>
								</table>
							</div>


							<div className="notifications-block">
								<table>
									<thead>
										<tr>
											<th>Escrow.com</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>A milestone is agreed by client on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_agreed_by_freelancer} onChange={this.onChangeMilestoneAgreedByFreelancerNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_agreed_by_freelancer_email} onChange={this.onChangeAgreedByFreelancerEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is delivered on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_delivered} onChange={this.onChangeMilestoneDeliveredByFreelancerNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_delivered_email} onChange={this.onChangeMilestoneDeliveredByFreelancerEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is received by client on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_received} onChange={this.onChangeMilestoneReceivedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_received_email} onChange={this.onChangeMilestoneReceivedEmail}/></td>
										</tr>
										<tr>
											<td>A milestone is accepted by client on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_accepted_on_escrow} onChange={this.onChangeMilestoneDeliveredByFreelancerNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().milestone_accepted_on_escrow_email} onChange={this.onChangeMilestoneDeliveredByFreelancerEmail}/></td>
										</tr>
										<tr>
											<td>Client has made the payment on Escrow.</td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().payment_approved} onChange={this.onChangePaymentApprovedNotify}/></td>
											<td><Switch size="small" loading={this.state.button_loading} defaultChecked={Defender.currentUser().payment_approved_email} onChange={this.onChangePaymentApprovedEmail}/></td>
										</tr>
									</tbody>
								</table>
							</div>
						</React.Fragment>
					}

					<div className="notifications-block">
						<table>
							<thead>
								<tr>
									<th>Messages</th>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Send unread messages to my email after.</td>
									<td colSpan="2">
										<Select
											style={{ width: 160 }}
											showSearch
											placeholder="Select Time"
											optionFilterProp="children"
											onChange={this.updateUnreadEmailSettings}
											filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
											>
											<Option value="15">15 mins</Option>
											<Option value="30">30 mins</Option>
											<Option value="60">1 hour</Option>
											<Option value="Never">Never</Option>
										</Select>

	  								</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Skeleton>
			</div>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
    user_view_reducer: state.user_view_reducer
  };
}

export default connect(mapStateToProps)(NotificationSettings);

