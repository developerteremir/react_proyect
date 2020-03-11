import React from 'react';

import './styles/Badge.css';
import confLogo from '../images/badge-header.svg';
import BadgeList from '../components/BadgesList';

import api from '../api';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import Gravatar from '../components/Gravatar';
class Badge extends React.Component {

  state={
    loading: true,
    error: null,
    data:undefined
  }

  componentDidMount(){
    this.fetchData();

  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try{
      const data = await api.badges.list();
      this.setState({loading:false, data: data});
    }catch(error){
      this.setState({loading:false, error: error});
    }
  }

  render() {
    if(this.state.loading){
      return <PageLoading />;
    }

    if(this.state.error){
      return <PageError error={this.state.error} />;
    }

    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>

        <div className="Badge__section-name">
          <Gravatar
            className="Badge__avatar"
            email={this.props.email}
            alt="Avatar"
          />
          <h1>
            {this.props.firstName} <br /> {this.props.lastName}
          </h1>
        </div>

        <div className="Badge__section-info">
          <h3>{this.props.jobTitle}</h3>
          <div>@{this.props.twitter}</div>
        </div>

        <div className="Badge__footer">#platziconf</div>
      </div>
    );
  }
}

export default Badge;
