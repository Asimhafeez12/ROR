import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Tabs } from 'antd';
import Security from './security';
import Account from './account';
import BillingInfo from './billing_info';
import Payments from './payments';
import Defender from './../../helpers/defender';


const TabPane = Tabs.TabPane;


class Setting extends Component{
	render(){
		document.body.classList.add('setting-page');
		return(
			<div className="setting-holder">
				<Tabs tabPosition='left'>
					<TabPane tab="Security" key="1"><Security /></TabPane>
					<TabPane tab="Account" key="2"><Account /></TabPane>
					<TabPane tab="Billing Info" key="3"><BillingInfo /></TabPane>
					{Defender.currentUser()._r.includes("client") ? 
						<TabPane tab="Payments" key="4"><Payments /></TabPane>
					: "" }
				</Tabs>
			</div>
		);
	}
}


export default Setting