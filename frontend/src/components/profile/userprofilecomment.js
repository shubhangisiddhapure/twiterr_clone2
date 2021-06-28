/** @format */

import React from "react";
import {  useHistory } from "react-router-dom";
import Comments from "@material-ui/icons/ChatBubbleOutline";
const Userprofilecomment = (props) => {
  const history = useHistory();
  const id = props.data._id;
  const commentpage = () => {
    history.push({
      pathname: "/comment/" + id,
    });
  };

  return (
    <div>
      <Comments onClick={(e) => commentpage()}></Comments>
    </div>
  );
};
export default Userprofilecomment;
