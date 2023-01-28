import React from 'react'
import { Statistic } from 'semantic-ui-react'


const GenerateHeader = (value) => {
    return (
    <Statistic.Group widths={1} size='small'>
        <Statistic>
            <Statistic.Value>{value}</Statistic.Value>
        </Statistic>
    </Statistic.Group>)
}

export default GenerateHeader;