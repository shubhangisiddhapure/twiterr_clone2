/** @format */

import { Avatar,Button } from "@material-ui/core";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./tweetbox.css";
import axios from "axios";
function TweetBox() {
 
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setsucess] = useState("");
  const sendTweet = async () => {
    try {
      const resp = await axios.post(
        "https://twitter-clone-shubhangi.herokuapp.com/api/tweet",
        { text },
        {
          headers: {
            "x-auth-token": localStorage.getItem("login"),
          },
        }
      );
      if (resp) {
        setsucess(true);
      }
    
    } catch (err) {
      setError("Please add Text");
    }
    setText("");
  };
  return (
    <div>
      <Card style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}>
        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              
              <Avatar />
              <input
                value={text}
                placeholder="What's happening"
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <Button
              onClick={() => sendTweet()}
              className="tweetBox__tweetButton"
            >
              Tweet
            </Button>
          </form>
        </div>
      </Card>
      {success ? (
        <p>Tweet Added sucessfully</p>
      ) : (
        <p style={{ color: "red" }}> {error} </p>
      )}
    </div>
  );
}
export default TweetBox;
