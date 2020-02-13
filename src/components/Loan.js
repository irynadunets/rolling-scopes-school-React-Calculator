import React, { Component } from 'react';
import { render } from 'react-dom';
import InputLabeled from './Input';
import SelectOptions from './Select';
import IconInformation from './Icon';
import ButtonEx from './Button';
import LoaderActive from './Loader';
import { getDataMsrp } from './data-service-mock';

class Loan extends Component {
  constructor(props) {
    super(props);
    this.state = {
        price: localStorage.getItem('price') ? localStorage.getItem('price') : 0,
        tradeIn: localStorage.getItem('Trade-In Value') ? localStorage.getItem('Trade-In Value') : 0,
        downPayment: localStorage.getItem('Down Payment') ? localStorage.getItem('Down Payment') : 0,
        term: localStorage.getItem('term') ? localStorage.getItem('term') : 24,
        creditScore: localStorage.getItem('Approx. Credit Score') ? localStorage.getItem('Approx. Credit Score') : 750,
        apr: localStorage.getItem('Estimated APR') ? localStorage.getItem('Estimated APR') : 0,
        zip: localStorage.getItem('Home ZIP Code') ? localStorage.getItem('Home ZIP Code') : 79069,
        payment: localStorage.getItem('payment') ? localStorage.getItem('payment') : 0,
        isLoading: true,
        error: null
      };
  }

  componentWillMount() {
    getDataMsrp.then(data => this.setState({ price:data ,isLoading:false }))
           .catch(error => this.setState({ error:true, isLoading: false }));
  if(!window.localStorage.price) window.localStorage.setItem('price', this.state.price);
  }

  updateTermScore = (vl) => {
     vl < 100 ? this.state.term = vl:this.state.creditScore = vl;
    if( vl < 100 ){
     !window.localStorage.term ? window.localStorage.setItem('term', vl) : window.localStorage.term = vl;
   } else {
     !window.localStorage.creditScore ? window.localStorage.setItem('Approx. Credit Score', vl) : window.localStorage.creditScore = vl;
   }
    let creditScoreValue;
    if (this.state.creditScore >= 750) {
       creditScoreValue = 0.95;
    } else if (this.state.creditScore >= 700) {
       creditScoreValue = 1;
    } else if (this.state.creditScore >= 650) {
       creditScoreValue = 1.05;
    } else {
       creditScoreValue = 1.2;
    }
    this.state.payment = Math.round((this.state.price-this.state.tradeIn-this.state.downPayment)/this.state.term*creditScoreValue*this.state.apr);
    document.getElementById('payment').innerHTML = `$${this.state.payment}`;
    !window.localStorage.payment ? window.localStorage.setItem('payment', this.state.payment) : window.localStorage.payment = this.state.payment;
    this.props.updateData(this.state.payment, this.state.zip);
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
  case 'Estimated APR':
     this.state.apr = vl;
     !window.localStorage.apr ? window.localStorage.setItem('Estimated APR', vl) : window.localStorage.apr = vl;
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
  this.state.payment = Math.round((this.state.price-this.state.tradeIn-this.state.downPayment)/this.state.term*creditScoreValue*this.state.apr);
  document.getElementById('payment').innerHTML = `$${this.state.payment}`;
  !window.localStorage.payment ? window.localStorage.setItem('payment', this.state.payment) : window.localStorage.payment = this.state.payment;
  this.props.updateData(this.state.payment, this.state.zip);
}


  render() {
  if(this.state.isLoading) return <LoaderActive />;
  console.log(this.state.price);
      return (
        <div className="column">
          <div className="row3">
           <div className="column1"><IconInformation value={'Est.loan Payment'}/> </div>
           <div className="column2" id="payment" >${this.state.payment}</div>
          </div>
          <div className="row3">
             <div className="column1"><IconInformation value={'Edmunts Suggested Price'}/> </div>
             <div className="column2">${Math.round(this.state.price*0.9)}</div>
          </div>
          <h6>After ${Math.round(this.state.price*0.1)} in rabates</h6>
         <div>Term (Months)</div>
          <div className="row4">
          {['12','24','36','48','60','72','84'].map((item) => {
              return <ButtonEx value={item} updateTermScore={this.updateTermScore} />;
          })}
          </div>
          <div className="row3">
             <div className="column1"><IconInformation value={'Trade-In Value'}/> </div>
             <div className="column2" ><InputLabeled name={'Trade-In Value'} value={this.state.tradeIn} position={'left'} content={'$'} price={this.state.price} updateInput={this.updateInput}/></div>
          </div>
          <div className="row3">
             <div className="column1"><IconInformation value={'Down Payment'}/> </div>
             <div className="column2"><InputLabeled name={'Down Payment'} value={this.state.downPayment} position={'left'} content={'$'} price={this.state.price} updateInput={this.updateInput}/></div>
          </div>
          <div><IconInformation value={`Approx. Credit Score`}/></div>
          <div className="row4">
          {['600','650','700','750','800','850','900'].map((item) => {
              return <ButtonEx value={item} updateTermScore={this.updateTermScore}/>;
          })}
          </div>
          <div className="row3">
             <div className="column1"><IconInformation value={'Estimated APR'}/> </div>
             <div className="column2"><InputLabeled name={'Estimated APR'} value={this.state.apr} position={'right'} content={'%'} updateInput={this.updateInput}/></div>
          </div>
          <div className="row3">
             <div className="column1"><IconInformation value={'Home ZIP Code'}/> </div>
             <div className="column2"><InputLabeled name={'Home ZIP Code'} value={this.state.zip} position={'right'} content={'zip'} updateInput={this.updateInput}/></div>
          </div>
        </div>
 )
 }
 }

export default Loan;
