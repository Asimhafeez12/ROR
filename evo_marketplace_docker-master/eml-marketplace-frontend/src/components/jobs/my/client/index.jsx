import React, { Component } from 'react';
import PendingJobs from './open_jobs';
import ActiveJobs from './active_jobs';
import CompletedJobs from './completed_jobs';
import { Button, Tabs, Skeleton } from 'antd';

class MyClientJobs extends Component{

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
		const TabPane = Tabs.TabPane
		return(
			<div className="myclientjobs-holder">
				<Skeleton loading={this.state.loading} title={{ width: '600px' }} paragraph={{row:3, width: '400px' }} active>
					<div className="home-header">
						<Button href="/job_creation" className="post-job-btn" type="primary" size="large">Post A New Job</Button>
					</div>
					<div className="tabs-holder">
						<Tabs defaultActiveKey="1" >
							<TabPane tab="Pending Jobs" key="1"><PendingJobs /></TabPane>
							<TabPane tab="Active Jobs" key="2"><ActiveJobs /></TabPane>
							<TabPane tab="Completed Jobs" key="3"><CompletedJobs /></TabPane>
						</Tabs>
					</div>
				</Skeleton>
			</div>
		);
	}
}

export default MyClientJobs;