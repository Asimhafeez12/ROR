import React, { Component } from 'react';
import { Tabs, Skeleton } from 'antd';
import CompletedJobs from './completed_jobs';
import ActiveJobs from './active_jobs';

class FreelancerJobs extends Component{

	state = {
		loading: true,
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
	}

	render(){
		document.body.classList.add('my-jobs-page');
		const TabPane = Tabs.TabPane;
		return(
			<div className="myclientjobs-holder">
				<Skeleton loading={this.state.loading} title={{ width: '600px' }} paragraph={{row:3, width: '400px' }} active>
					<div className="tabs-holder">
						<Tabs defaultActiveKey="2">
							<TabPane tab="Active Jobs" key="2"><ActiveJobs /></TabPane>
							<TabPane tab="Closed Jobs" key="3"><CompletedJobs /></TabPane>
						</Tabs>
					</div>
				</Skeleton>
			</div>
		);
	}
}

export default FreelancerJobs