import React, { PureComponent } from "react";
import './ContentViewer.css'
const path = require('path');

class ContentViewer extends PureComponent {

    render() {
        const url = "memexdata://" + path.join("local-mems", this.props.contentLocation) + ".pdf"

        return (
            // <iframe className="content-viewer" src={url}></iframe>
            <object data={url} type="application/pdf">
                <embed src={url} type="application/pdf"/>
            </object>
        )
    }
}

export default ContentViewer