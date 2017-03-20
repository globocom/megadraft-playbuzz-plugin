/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

export default class PlayBuzz extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url) {
      window.PlayBuzz.Feed.renderFeed();
    }
  }

  render() {
    if (!this.props.url) {
      return null;
    }

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
