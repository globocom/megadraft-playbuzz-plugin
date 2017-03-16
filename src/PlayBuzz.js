/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import load from "load-script";

export default class PlayBuzz extends Component {

  loadWidget() {
    if (window.PlayBuzz) {
      return;
    }
    load('//cdn.playbuzz.com/widget/feed.js', function (err, script) {
      if (err) {}
    })
  }

  render() {
    if (!this.props.url) {
      return null;
    }

    this.loadWidget();

    return (
      <div className="playbuzz">
        <div className="pb_feed"
          data-game={this.props.url}
          data-recommend="false"
          data-game-info="false"
          data-comments="false"
          data-shares="false">
        </div>
      </div>
    );
  }
}
