import React from 'react'
import { Collapse } from 'react-collapse';
import Octicon, { ChevronDown, ChevronUp } from '@githubprimer/octicons-react'



class Review extends React.Component {
    state = {
        open: false
    }
    render() {
        const { review } = this.props
        const { open } = this.state

        return (
            <div key={review.id} style={{ borderBottom: '1px solid lightgray', padding: 20, fontSize: '18px' }}>
                <strong>{review.author}</strong><br /><br />
                {!open && <p>{review.content.substr(0, 140)} ...</p>}
                <Collapse isOpened={open}>
                    <p>
                        {review.content}
                    </p>
                </Collapse>
                <div className='chevron-down-div'>
                    <div className='chevron-down' onClick={() => this.setState({ open: !open })}>
                        <Octicon icon={!open ? ChevronDown : ChevronUp} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Review