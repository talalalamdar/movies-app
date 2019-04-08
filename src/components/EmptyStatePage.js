import React from 'react'

class EmptyStatePage extends React.Component {

    render() {

        return (
            <div style={{  fontSize: '40px', color: 'gray' }}>
                <p>{this.props.message}</p>
            </div>
        )
    }
}

export default EmptyStatePage