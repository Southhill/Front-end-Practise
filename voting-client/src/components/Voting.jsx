import React from 'react';

export default
class extends React.components {
    constructor() {
        super();
    }

    getPair() {
        return this.props.pair || [];
    }

    render() {
        return (
            <div className="voting">
                {this.getPair().map(entry =>
                    <Button key={entry}>
                        <h1>{entry}</h1>
                    </Button>
                )}
            </div>
        )
    }
}
