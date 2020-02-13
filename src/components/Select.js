import React from 'react'
import { Select } from 'semantic-ui-react'

class SelectOptions extends React.Component {
  render() {
    return (
      <Select placeholder={ this.props.placeholder } name={ this.props.name } options={ this.props.options } onChange={(e) => { this.props.updateSelect( e.target.outerText, this.props.name )}}/>
    );
  }
}

export default SelectOptions
