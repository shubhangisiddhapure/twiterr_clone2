/** @format */

import React, { useState, useEffect } from "react";
import ShareIcon from "@material-ui/icons/Share";
import axios from "axios";
var jwt = require("jsonwebtoken");
function Retweet(props) {
  const [count, setCount] = useState("");
  const [retweet, setRetweet] = useState("");
  const token = localStorage.getItem("login");
  var decode1 = jwt.decode(token);
  const loggeduserId = decode1.user.id;
  const id = props.data._id;
  const result = props.data.retweets.filter((id) => id === loggeduserId);
  useEffect(async () => {
    const response = await axios.get(
      "https://twitter-clone-shubhangi.herokuapp.com/api/alltweet",
      {
        headers: {
          "x-auth-token": localStorage.getItem("login"),
        },
      }
    );
    if (result.length === 0) {
      setRetweet(true);
    } else {
      setRetweet(false);
    }
    setCount(props.data.retweetCount);
  }, []);
  const Follow = async (e) => {
    const response = await axios.put(
      "https://twitter-clone-shubhangi.herokuapp.com/api/reTweet",
      { id },
      {
        headers: {
          "x-auth-token": localStorage.getItem("login"),
        },
      }
    );
    setRetweet(false);
    setCount(count + 1);
  };
  const Unfollow = async (e) => {
    const response = await axios.put(
      "https://twitter-clone-shubhangi.herokuapp.com/api/undoRetweet",
      { id },
      {
        headers: {
          "x-auth-token": localStorage.getItem("login"),
        },
      }
    );

    setRetweet(true);
    setCount(count - 1);
  };
  return (
    <div>
      <div>
        {retweet === true ? (
          <div>
            <ShareIcon onClick={() => Follow()} /> {count}
          </div>
        ) : (
          ""
        )}
        {retweet === false ? (
          <div>
            <ShareIcon style={{ color: "green" }} onClick={() => Unfollow()} />{" "}
            {count}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Retweet;
