import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as upActions from './../../actions/users/user_portfolios';
import Defender from './../../helpers/defender';
import Avatar from '../dashboard/avatar';

const FormItem = Form.Item;


class EditUserPortfolioForm extends Component {
  state = {
    confirmDirty: false,
    modal_edit_portfolios: this.props.modal_edit_portfolios
  }

  handleCancelUserPortfolio(e){
    e.preventDefault();
    this.setState({ modal_edit_portfolios: false });
  }

  setModalEditPortfolios(modal_edit_portfolios) {
    this.setState({ modal_edit_portfolios });
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
            this.props.updatePortfolio(this.props.user_portfolio.id, data);
            this.props.fetchUserPortfolios(Defender.currentUser().id);
            this.setState({
              modal_edit_portfolios: false,
            });
          }
      else {
            // this.props.fetchUserPortfolios(Defender.currentUser().id);
            // this.setState({
            //   modal_edit_portfolios: false,
            // });
      }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user_portfolio } = this.props;

    return (
      <React.Fragment>
          <Modal
            title="Edit Portfolio"
            centered
            visible={this.state.modal_edit_portfolios}
            onOk={() => this.setModalEditPortfolios(false)}
            onCancel={() => this.setModalEditPortfolios(false)}
            footer={[
            <Form key={5} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem className="portfolio-popup-title">
                  {getFieldDecorator('portfolio_title',{
                    initialValue: user_portfolio.title,
                    rules: [{ required: true, message: 'Enter Title of Portfolio' }, {max: 50, message: 'Please enter less text for title'}],
                  })(
                  <Input size="large" placeholder="Title" />
                  )}
              </FormItem>
              <FormItem className="portfolio-popup-title2">
                  {getFieldDecorator('portfolio_link',{
                    initialValue: user_portfolio.link,
                    rules: [{max: 200, message: 'Please enter less text for link'}],
                  })(
                <Input size="large" placeholder="Link" />
                  )}
              </FormItem>
              <Avatar />
              <Button key="back" onClick={this.handleCancelUserPortfolio.bind(this)}>Cancel</Button>
                   <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Save</Button>
            </Form>
                ]}
          >
          </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleEditUserPortfolioForm: ownProps.cancelFunc,
    modal_edit_portfolios: ownProps.modal_edit_portfolios,
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
     updatePortfolio: (user_portfolio_id, data) => (dispatch(upActions.update(user_portfolio_id, data)))
  };
}

const wrappedEditUserPortfolioForm = Form.create()(EditUserPortfolioForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedEditUserPortfolioForm);
