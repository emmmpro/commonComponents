import React, { Component } from 'react'
import './style'

class CollPanel extends Component {
    state = {
        fold: this.props.fold
    }
    foldItem = () => {
        const { fold } = this.state
        this.setState({ fold: !fold })
    }
    render() {
        const { title, children } = this.props
        const { fold } = this.state
        return (
            <div>
                <p className="coll-title">
                    <span>{title}</span>
                    <a onClick={() => this.foldItem()}>
                        <i className={fold ? "icon-arrow-up12" : "icon-arrow-down12"}></i>
                    </a>
                </p>
                <div className={fold ? "hide-content" : "show-content"}>{children}</div>
            </div>
        )
    }
}
export default CollPanel