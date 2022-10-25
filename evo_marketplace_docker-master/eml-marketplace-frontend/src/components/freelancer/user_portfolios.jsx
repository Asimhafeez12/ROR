import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Skeleton } from 'antd';
import * as upActions from './../../actions/users/user_portfolios';
import UserPortfolioForm from './user_portfolio_form';
import EditUserPortfolioForm from './edit_user_portfolio_form';
import Defender from './../../helpers/defender';


class UserPortfolios extends Component {

    state = {
      loading2: true,
      modal_portfolios: false,
      showUserPortfolioForm: false,
      modal_edit_portfolios: false,
      showEditUserPortfolioForm: false,
      selected_portfolio_id: 0
    };


 componentWillMount() {
    this.props.fetchUserPortfolios(window.location.href.split('/')[4]);

    setTimeout(() => {
      this.setState({ loading2: false });
    }, 2000);
 }

  toggleUserPortfolioForm(e) {
      e.preventDefault();
      this.setState({
        showUserPortfolioForm: !this.state.showUserPortfolioForm,
        modal_portfolios: !this.state.modal_portfolios,
      });
  }

  toggleEditUserPortfolioForm(e) {
      e.preventDefault();
      this.setState({
        showEditUserPortfolioForm: !this.state.showEditUserPortfolioForm,
        modal_edit_portfolios: !this.state.modal_edit_portfolios,
      });
  }

    removePortfolio(obj_portfolio, e){
      this.props.removePortfolio(obj_portfolio);
      this.props.fetchUserPortfolios(Defender.currentUser().id);
    }

 render() {
   const { user_portfolios } = this.props.user_portfolios_reducer;
   const { user } = this.props;
   return (
      <section className="profile-section5">
          <Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
                <h2 className="section-title">Portfolio</h2>
                { this.state.showUserPortfolioForm ? <UserPortfolioForm cancelFunc={this.toggleUserPortfolioForm.bind(this)} modal_portfolios={this.state.modal_portfolios}/> : ''}
                {Defender.currentUser().id === user.id ? 
                    <a className="profile-add-btn" type="primary" onClick={this.toggleUserPortfolioForm.bind(this)}>Add Portfolio Items</a>
                : "" }

                {user_portfolios && user_portfolios.length > 0 ?
                  <React.Fragment>
                      <ul className="portfolio-list">
                      {user_portfolios && user_portfolios.map( (portfolio, index) =>
                        <li key={index}>
                          <div className="portfolio-image-holder" style ={ { backgroundImage: "url("+portfolio.avatar_url+")" } }>
                              {Defender.currentUser().id === user.id ?
                                  <div className="portfolio-button-holder">
                                      <a className="portfolio-del-btn" type="primary" onClick={this.removePortfolio.bind(this,portfolio.id)}><Icon type="delete" /></a>
                                      { this.state.showEditUserPortfolioForm ? <EditUserPortfolioForm cancelFunc={this.toggleEditUserPortfolioForm.bind(this)} modal_edit_portfolios={this.state.modal_edit_portfolios} user_portfolio={portfolio}/> : ''}
                                      <a className="portfolio-edit-btn" type="primary" onClick={this.toggleEditUserPortfolioForm.bind(this)}><Icon type="edit" /></a>
                                  </div>
                              : "" }
                          </div>
                          <h5>{portfolio.title}<br />{portfolio.link}</h5>
                        </li>
                      )}
                      </ul>
                  </React.Fragment>
                :
                  <div className="no-content-block">
                    <h4>No portfolio added yet.</h4>
                  </div>
                }
          </Skeleton>
      </section>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
   user_portfolios_reducer: state.user_portfolios_reducer,
   user: ownProps.user
 };
}

function mapDispatchToProps(dispatch) {
 return {
   fetchUserPortfolios: (user_id) => {
     dispatch(upActions.fetch(user_id))
   },
    removePortfolio: (user_portfolio_id) => (dispatch(upActions.remove(user_portfolio_id)))
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolios);