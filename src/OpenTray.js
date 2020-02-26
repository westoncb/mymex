import React, { PureComponent } from "react";
import './OpenTray.css';

export default class OpenTray extends PureComponent {

    constructor(props) {
        super(props)
    }

    handleItemClick = (e) => {

    }

    render() {
        return (
            <div className="main-col">
                {
                    this.props.openItems.map(item => (
                        <div className="item" key={item._id} onClick={this.handleItemClick}>
                            <div className="item-thumbnail"></div>
                            <div className='item-name'>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}