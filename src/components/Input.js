import React from 'react'
import { Input, Label } from 'semantic-ui-react'


class InputLabeled extends React.Component {

  render() {
    return (
      <Input price={this.props.price} name={this.props.name} labelPosition={this.props.position} type='text' placeholder={this.props.value} onChange={(e) => {
          if(this.props.name ==='Trade-In Value' || this.props.name ==='Down Payment'){              
              let p = this.props.price/4;
              console.log(p);
            if(e.target.value <= p){
                this.props.updateInput(e.target.value,this.props.name);
            }else{
              alert(`Value ${this.props.name} must be < ${Math.round(p)}`);
            }
          } else{
            this.props.updateInput(e.target.value,this.props.name);
          }
        }}>
        <input id="error" />
        <Label>{this.props.content}</Label>
      </Input>
    );
  }
}

export default InputLabeled
