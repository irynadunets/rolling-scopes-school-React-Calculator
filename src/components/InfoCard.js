import React, { Component } from 'react';
import { Card, Icon, Button, Image, Breadcrumb, List, Rating } from 'semantic-ui-react';
import { getData } from './data-service-mock';
import LoaderActive from './Loader';

const sections = [
  { key: 'calculate taxes and fees', content: 'TAXES AND FEES:', link: true},
  { key: 'T', content: '', active: true },
]

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        payment: localStorage.getItem('payment') ? localStorage.getItem('payment') : 0,
        zip: localStorage.getItem('Home ZIP Code') ? localStorage.getItem('Home ZIP Code') : 79069,
        isLoading: true,
        error: null,
      };
  }

  componentWillMount() {
    getData.then(data => this.setState({ data:data ,isLoading:false }))
           .catch(error => this.setState({ error:true, isLoading: false }));
  }


render() {
if(this.state.isLoading) return <LoaderActive />;
    return (
      <Card>
      <Card.Content>
        <Card.Header>
        <div className="row3">
           <div className="column1">MSRP</div>
           <div className="column2"><strike>${this.state.data.msrp}</strike></div>
        </div>
        </Card.Header>
        <Card.Meta>{this.state.data.vehicleName}</Card.Meta>
        <Card.Description>
        <div className="row3">
           <div className="column1"> Est. Monthly Payment</div>
           <div className="column2">${this.props.payment}</div>
        </div>
        <div className="row3">
           <div className="column1"> <Breadcrumb icon='right angle' sections={sections} onClick={(e) => { let z = this.props.zip; document.getElementById('taxes').innerHTML = [].map.call(z.toString(), function(x) {return x*11}).join('/')}} /></div>
           <div className="column2" id="taxes"></div>
        </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            SHOW THE EDMUNTS DEAL
          </Button>
          <Button basic color='red'>
            GET DEALER OFFER
          </Button>
        </div>
        <List>
    <List.Item>
      <List.Icon name='users' />
      <List.Content>{this.state.data.dealerName}</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='marker' />
      <List.Content>{this.state.data.dealerLocation}</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='mail' />
      <List.Content>
        <a href='mailto:jack@dealer.com'>{this.state.data.dealerMail}</a>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='linkify' />
      <List.Content>
        <a href='http://www.dealer.com'>{this.state.data.dealerWeb}</a>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='phone volume' />
      <List.Content>{this.state.data.dealerPhone}</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='' />
      <List.Content>
        <Rating icon='star' defaultRating={this.state.data.dealerRating} maxRating={4} />
      </List.Content>
    </List.Item>
  </List>
      </Card.Content>
    </Card>
)
   }
}

export default InfoCard
