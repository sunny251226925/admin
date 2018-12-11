import React from 'react'

class welcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: "欢迎光临"
        }
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}

export default welcome;
