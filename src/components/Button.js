import React from 'react'
import { Button } from 'semantic-ui-react';

class ButtonEx extends React.Component {

  render() {
    return (
      <Button value = { this.props.value } onClick={(e) => { this.props.updateTermScore(e.target.value) }}>
        { this.props.value }
      </Button>
    );
  }
}

export default ButtonEx
