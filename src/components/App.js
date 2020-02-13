import React, { Component } from 'react';
import InfoCard from './InfoCard';
import { getDataMsrp } from './data-service-mock';
import LoaderActive from './Loader';
import { render } from 'react-dom';
import './main.css';
import { Tab } from 'semantic-ui-react';
import InputLabeled from './Input';
import SelectOptions from './Select';
import IconInformation from './Icon';
import ButtonEx from './Button';
import Loan from './Loan';
import Lease from './Lease';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        zip: localStorage.getItem('Home ZIP Code') ? localStorage.getItem('Home ZIP Code') : 79069,
        payment: localStorage.getItem('payment') ? localStorage.getItem('payment') : 0,
        error: null,
        name: '',
      };
}

updateData = (payment, zip) => {
   this.setState({ payment:payment,zip:zip });
}

  render(){
      return (
      <div className="container">
        <div className="row">
          <Tab className='LoaneLease' panes={[
            { menuItem: 'Loan', render: () => <Tab.Pane>
           <Loan updateData={this.updateData} />
           </Tab.Pane> },
            {  menuItem: 'Lease', render: () => <Tab.Pane>
           <Lease updateData={this.updateData}/>
          </Tab.Pane> }
        ]}  />
          <InfoCard payment={this.state.payment} zip={this.state.zip} />
        </div>
      </div>
    );
  }
}

export default App;
