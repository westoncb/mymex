import React, { PureComponent } from "react";
import './SearchResults.css';
import TreeNode from './TreeNode'
import Util from './Util'

export default class SearchResults extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            results: props.results,
            visible: props.visible
        };
    }

    render() {
        this.props.results.forEach(result => {
            result.children.sort((a, b) => {
                const x = Util.isLeaf(a) ? 1 : 0
                const y = Util.isLeaf(b) ? 1 : 0

                return x - y
            })
        })

        return (
            <div>
                {(this.props.visible) &&
                    <div className="results-panel-parent">
                        <div className="results-panel">

                            {this.props.results.map((result, i) => (
                                <div key={result.id} className="result-section">
                                    <div className="result-path">
                                        {result.path}
                                    </div>

                                    <TreeNode
                                        key={result.guid}
                                        node={result}
                                        depth={0}
                                        openItemFunc={this.props.openItemFunc}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }
}