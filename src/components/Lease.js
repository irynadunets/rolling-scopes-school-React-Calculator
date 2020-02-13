import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab } from 'semantic-ui-react';
import InputLabeled from './Input';
import SelectOptions from './Select';
import IconInformation from './Icon';
import ButtonEx from './Button';
import LoaderActive from './Loader';
import { getDataMsrp } from './data-service-mock';

const creditScore = [
    { key: '600', value: '600', text: '600' },
    { key: '650', value: '650', text: '650' },
    { key: '700', value: '700', text: '700' },
    { key: '750', value: '750', text: '750' },
    { key: '800', value: '800', text: '800' },
    { key: '850', value: '850', text: '850' },
    { key: '900', value: '900', text: '900' }
  ]

  const Term = [
      { key: '24', value: '24', text: '24' },
      { key: '36', value: '36', text: '36' },
      { key: '48', value: '48', text: '48' }
    ]

  const Miles = [
    { key: '10000', value: '10000', text: '10000' },
    { key: '12000', value: '12000', text: '12000' },
    { key: '15000', value: '15000', text: '15000' }
  ]

class Lease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: localStorage.getItem('price')?localStorage.getItem('price'):0,
      tradeIn: localStorage.getItem('Trade-In Value')?localStorage.getItem('Trade-In Value'):0,
      downPayment: localStorage.getItem('Down Payment')?localStorage.getItem('Down Payment'):0,
      term: localStorage.getItem('term')?localStorage.getItem('term'):24,
      creditScore: localStorage.getItem('Approx. Credit Score')?localStorage.getItem('Approx. Credit Score'):750,
      annualMiles: localStorage.getItem('Annual Miles')?localStorage.getItem('Annual Miles'):12000,
      zip: localStorage.getItem('Home ZIP Code')?localStorage.getItem('Home ZIP Code'):79069,
      payment: localStorage.getItem('payment')?localStorage.getItem('payment'):0,
      isLoading: true,
      error: null
      };
  }

  updateInput = (vl,name) => {
    switch(name) {
  case 'Trade-In Value':
    this.state.tradeIn = vl;
    !window.localStorage.tradeIn ? window.localStorage.setItem('Trade-In Value', vl) : window.localStorage.tradeIn = vl;
    break;
  case 'Down Payment':
    this.state.downPayment = vl;
    !window.localStorage.downPayment ? window.localStorage.setItem('Down Payment', vl) : window.localStorage.downPayment = vl;
    break;
  case 'Home ZIP Code':
    this.state.zip = vl;
    !window.localStorage.zip ? window.localStorage.setItem('Home ZIP Code', vl) : window.localStorage.zip = vl;
    break;
  default:
    break;
   };
 let creditScoreValue;
   if (this.state.creditScore >= 750) {
      creditScoreValue=0.95;
   } else if (this.state.creditScore >= 700) {
      creditScoreValue=1;
   } else if (this.state.creditScore >= 650) {
      creditScoreValue=1.05;
   } else {
      creditScoreValue=1.2;
   }
   this.state.payment = Math.round((this.state.price-this.state.tradeIn-this.state.downPayment)*this.state.annualMiles/1000/this.state.term*creditScoreValue);
   document.getElementById('paymentl').innerHTML = `$${this.state.payment}`;
   window.localStorage.setItem('payment', this.state.payment);
   this.props.updateData(this.state.payment, this.state.zip);
  }

  updateSelect = (vl,name) => {
    switch(name) {
  case 'Approx. Credit Score':
    this.state.creditScore = vl;
    !window.localStorage.creditScore ? window.localStorage.setItem('Approx. Credit Score', vl) : window.localStorage.creditScore = vl;
    break;
  case 'term':
    this.state.term = vl;
    !window.localStorage.term ? window.localStorage.setItem('term', vl) : window.localStorage.term = vl;
    break;
  case 'Annual Miles':
    this.state.annualMiles = vl;
    !window.localStorage.annualMiles ? window.localStorage.setItem('Annual Miles', vl) : window.localStorage.annualMiles = vl;
    break;
  default:
    break;
   };
  let creditScoreValue;
   if (this.state.creditScore >= 750) {
      creditScoreValue=0.95;
   } else if (this.state.creditScore >= 700) {
      creditScoreValue=1;
   } else if (this.state.creditScore >= 650) {
      creditScoreValue=1.05;
   } else {
      creditScoreValue=1.2;
   }
   this.state.payment = Math.round((this.state.price-this.state.tradeIn-this.state.downPayment)*this.state.annualMiles/10000/this.state.term*creditScoreValue);
   document.getElementById('paymentl').innerHTML = `$${this.state.payment}`;
   window.localStorage.setItem('payment', this.state.payment);
   this.props.updateData(this.state.payment, this.state.zip);      
  }

  componentWillMount() {
    getDataMsrp.then(data => this.setState({ price:data ,isLoading:false }))
           .catch(error => this.setState({ error:true, isLoading: false }));
  }

  render() {
  if(this.state.isLoading) return <LoaderActive />;
      return (
    <div className="column">
    <div className="row3">
     <div className="column1"><IconInformation value={'Est.lease Payment'}/> </div>
     <div className="column2" id="paymentl" >${this.state.payment}</div>
    </div>
    <div className="row">
      <div className="row6">
      <br />
      <div>
          <p>Home ZIP Code</p>
          <InputLabeled name={'Home ZIP Code'} value={this.state.zip} position={'left'} content={'z'} updateInput={this.updateInput}/>
       </div>
       {['Trade-In Value', 'Down Payment'].map((item) => {
            return  <div><br /><p>{item}</p><InputLabeled name={item} value={localStorage.getItem(item)} position={'right'} content={'$'} price={this.state.price} updateInput={this.updateInput}/></div>
        })}
      </div>
      <div className="row2">
        <br /><p>Approx.Credit Score</p>
       <SelectOptions placeholder={this.state.creditScore} name={'Approx. Credit Score'} options={creditScore} updateSelect={this.updateSelect}/><br />
         <br /><p>Term(Month)</p>
       <SelectOptions placeholder={this.state.term} name={'Term(Month)'} options={Term} updateSelect={this.updateSelect}/><br />
         <br /><p>Annual Miles</p>
       <SelectOptions placeholder={this.state.annualMiles} name={'Annual Miles'} options={Miles} updateSelect={this.updateSelect}/><br />
      </div>
   </div>
   </div>
 )
 }
 }

export default Lease;
