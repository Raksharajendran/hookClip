import React, { useState } from "react";
import "../css/Bucket.css";

const Bucket = (props) => {
  const [id, setId] = useState(0);
  const clickEventHandler = (event) => {
    event.preventDefault();
    setId(props.obj["bucket_id"]);
    props.onClickHandler(id);
    console.log(id);
  };
  return (
    <div className="boxBucket">
      <button className="bucketHead" onClick={clickEventHandler}>
        {props.obj["bucket_name"]}
      </button>
      <button className="buttonBucket">Delete</button>
    </div>
  );
};

export default Bucket;
