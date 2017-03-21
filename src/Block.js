/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import loadScript from "load-script";
import validUrl from "valid-url";

import PlayBuzz from "./PlayBuzz";
import Button from "./form/Button";
import ErrorList from "./form/ErrorList";

const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class Block extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeInput = ::this.onChangeInput;
    this.load = ::this.load;

    this.actions = [{
      key: "delete",
      icon: MegadraftIcons.DeleteIcon,
      action: this.props.container.remove
    }];

    const url = (props.data.url) ? props.data.url : "";
    this.state = {
      url: url,
      input: url,
      errors: []
    };
  }

  componentDidMount() {
    const self = this;
    if (window.PlayBuzz) { return; }

    loadScript("//cdn.playbuzz.com/widget/feed.js", function (err, script) {
      if (err) {
        self.setState({
          url: self.state.url,
          input: self.state.input.url,
          errors: [
            `Cound\'t load the required widget: ${script.src}`
          ]
        });
      }
    });
  }

  onChangeInput(e) {
    this.setState({
      url: this.state.url,
      input: e.target.value,
      errors: []
    });
  }

  validate(url) {
    if (!validUrl.isUri(url)) {
      return [ "Invalid URL" ];
    }
    const match = /^https?:\/\/www\.playbuzz\.com\/.*\/\w+/.exec(url);
    if (!match) {
      return [ "Invalid playbuzz URL" ];
    }
    return null;
  }

  load() {
    const url = this.state.input;
    const errors = this.validate(url);

    if (errors && errors.length) {
      this.setState({
        url: "",
        input: this.state.input,
        errors: errors
      });
      return;
    }

    this.setState({
      url: url,
      input: url,
      errors: []
    });
    this.props.container.updateData({
      url: url
    });
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
            onChange={this.onChangeInput} />
          <ErrorList errors={this.state.errors} />
        </BlockData>

        <BlockData>
          <Button label="Load" onClick={this.load} />
        </BlockData>
      </CommonBlock>
    );
  }
}
