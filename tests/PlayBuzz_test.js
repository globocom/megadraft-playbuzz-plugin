/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import PlayBuzz from "../src/PlayBuzz";

let expect = chai.expect;

describe("PlayBuzz", function () {
  beforeEach(function () {
    this.url = "http://www.playbuzz.com/peepersc10/who-is-your-favorite-super-hero";
    this.component = TestUtils.renderIntoDocument(
      <PlayBuzz url={this.url} />
    );
  });

  it("should render nothing when no URL", function () {
    const component = TestUtils.renderIntoDocument(
      <PlayBuzz />
    );
    expect(component.textContent).to.be.empty;
    expect(component.children).to.be.empty;
  });
});
