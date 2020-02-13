import React from 'react'
import { Icon } from 'semantic-ui-react'

const IconInformation = ({value}) => (
<div className='row5'>
    <div className='columni1'>{value}</div>
    <div className='columni2'><Icon disabled name='info circle' /></div>
</div>
)

export default IconInformation
