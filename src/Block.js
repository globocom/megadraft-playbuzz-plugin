/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons} from "megadraft";
const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;
import loadScript from "load-script";
import validUrl from "valid-url";

import PlayBuzz from "./PlayBuzz";
import Button from "./form/Button";
import ErrorList from "./form/ErrorList";


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

  componentDidMount() {
    if (window.PlayBuzz) { return; }
    loadScript("//cdn.playbuzz.com/widget/feed.js", function (err, script) {
      if (err) {
        this.setState({
          url: this.state.url,
          input: {
            url: this.state.input.url,
            errors: [ "Cound\'t load the required widget" ]
          }
        });
      }
    });
  }

  _onChangeInput(field, e) {
    let input = this.state.input;
    input[field] = e.target.value;
    this.setState({ input: input });
  }

  load() {
    let url = this.state.input.url;
    if (!url || !this.isValid(url)) {
      return;
    }
    this.setState({
      url: url,
      input: {
        url: "",
        errors: []
      }
    });
  }

  isValid(url) {
    let errors = [];
    if (!validUrl.isUri(url)) {
      errors.push("Invalid URL");
    }
    const match = /^http:\/\/www\.playbuzz\.com\/.*\/\w+/.exec(this.url);
    if (!match) {
      errors.push("Invalid playbuzz URL");
    }

    if (errors.length) {
      this.setState({
        url: this.state.url,
        input: {
          url: this.state.input.url,
          errors: errors
        }
      });
      return false;
    }

    return true;
  }

  render() {
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
          <ErrorList errors={this.state.input.errors} />
        </BlockData>

        <BlockData>
          <Button label="Load" onClick={this.load} />
        </BlockData>
      </CommonBlock>
    );
  }
}
