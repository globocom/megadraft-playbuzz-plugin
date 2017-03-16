/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons} from "megadraft";
const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;

import PlayBuzz from "./PlayBuzz";


export default class Block extends Component {
  constructor(props) {
    super(props);

    this._onChangeInput = ::this._onChangeInput;
    this.load = ::this.load;

    this.actions = [
      {
        "key": "delete",
        "icon": MegadraftIcons.DeleteIcon,
        "action": this.props.container.remove
      }
    ];

    this.state = {
      url: (props.data.url) ? props.data.url : "",
      input: {
        url: (props.data.url) ? props.data.url : "",
        errors: []
      }
    };
  }

  _onChangeInput(field, e) {
    let input = this.state.input;
    input[field] = e.target.value;
    this.setState({ input: input });
  }

  load() {
    if (!this.state.input.url) {
      return;
    }
    this.setState({
      url: this.state.input.url,
      input: {
        url: "",
        errors: []
      }
    });
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <PlayBuzz url={this.state.url} />
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Enter a playbuzz URL"
            value={(this.state.url) ? this.state.url : null}
            onChange={this._onChangeInput.bind(this, "url")} />
        </BlockData>

        <BlockData>
          <button onClick={this.load}>Load</button>
        </BlockData>
      </CommonBlock>
    );
  }
}
