"use strict";
const Generator = require("yeoman-generator");
const glob = require("glob");
const { resolve } = require("path");
const remote = require("yeoman-remote");

module.exports = class extends Generator {
  writing() {
    const done = this.async();
    remote(
      "afeiship",
      "boilerplate-jest",
      function(err, cachePath) {
        this.fs.copy(
          glob.sync(resolve(cachePath, "jest.config.js")),
          this.destinationPath()
        );
        done();
      }.bind(this)
    );
  }

  install() {
    this.npmInstall(["jest"], { "save-dev": true });
  }
};
