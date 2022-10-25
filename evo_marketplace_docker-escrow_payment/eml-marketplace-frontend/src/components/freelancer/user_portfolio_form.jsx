import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as upActions from './../../actions/users/user_portfolios';
import Defender from './../../helpers/defender';
import Avatar from '../dashboard/avatar';

const FormItem = Form.Item;


class UserPortfolioForm extends Component {
  state = {
    confirmDirty: false,
    modal_portfolios: this.props.modal_portfolios
  }

  handleCancelUserPortfolio(e){
    e.preventDefault();
    this.setState({ modal_portfolios: false });
  }

  setModalPortfolios(modal_portfolios) {
    this.setState({ modal_portfolios });
  }


  handleSubmit = (e) => {
        e.preventDefault();
    
      this.props.form.validateFieldsAndScroll((err, values) => {
        const {  avatar } = this.props.avatarReducer;
          if (!err) {
            let  data = {}
            data["title"] = values.portfolio_title;
            data["link"] = values.portfolio_link;
            data["avatar"] = avatar;
            this.props.addPortfolio({user_portfolio: data});
            this.props.fetchUserPortfolios(Defender.currentUser().id);
            this.setState({
              modal_portfolios: false,
            });
          }
      else {
            this.props.fetchUserPortfolios(Defender.currentUser().id);
            this.setState({
              modal_portfolios: false,
            });
      }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
          <Modal
            title="Add Portfolio"
            centered
            visible={this.state.modal_portfolios}
            onOk={() => this.setModalPortfolios(false)}
            onCancel={() => this.setModalPortfolios(false)}
            footer={[
            <Form key={5} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem className="portfolio-popup-title">
                  {getFieldDecorator('portfolio_title',{
                  })(
                  <Input placeholder="Title" />
                  )}
              </FormItem>
              <FormItem className="portfolio-popup-title2">
                  {getFieldDecorator('portfolio_link',{
                  })(
                <Input placeholder="Link" />
                  )}
              </FormItem>
              <Avatar />
              <Button key="back" onClick={this.handleCancelUserPortfolio.bind(this)}>Cancel</Button>
                   <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Save</Button>
            </Form>
                ]}
          >
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleUserPortfolioForm: ownProps.cancelFunc,
    modal_portfolios: ownProps.modal_portfolios,
    user_view_reducer: state.user_view_reducer,
    user_portfolios_reducer: state.user_portfolios_reducer,
    avatarReducer: state.avatar
  };
}

function mapDispatchToProps(dispatch) {
  return {
     fetchUserPortfolios: (user_id) => {
       dispatch(upActions.fetch(user_id))
     },
     addPortfolio: (data) => (dispatch(upActions.add(data))),
  };
}

const wrappedUserPortfolioForm = Form.create()(UserPortfolioForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedUserPortfolioForm);
