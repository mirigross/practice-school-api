const express = require("express");
const app = require("./app");
const PORT = 1339;

const init = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`listening to some very cool music on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
init();
