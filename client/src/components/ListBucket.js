import React, { useState, useEffect } from "react";
import NavBarLogin from "./NavBarLogin";
import Bucket from "./Bucket";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ListCard from "./ListCard";
import "../css/ListBucket.css";

const ListBucket = () => {
  const [buckets, setBuckets] = useState([]);
  const [id, setId] = useState(0);
  const [flag, setFlag] = useState(0);
  const getBucket = async () => {
    try {
      const response = await fetch("http://localhost:5000/buckets");
      const jsonData = await response.json();
      console.log(jsonData);
      setBuckets(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBucket();
  }, []);

  const clickHandler = (enteredId) => {
    setId(enteredId);
    console.log("hi");
    console.log(id);
    setFlag(1);
  };

  return (
    <div>
      <NavBarLogin />
      <div className="box">
        <img
          src={require("../images/movie.gif")}
          alt="movie image"
          className="movieGif"
        ></img>
        <h1 className="boxHeading">Bucket List</h1>
        <button className="buttonCreate">CREATE</button>
      </div>
      <div>
        {buckets.map((bucket) => (
          <div>
            <Bucket obj={bucket} onClickHandler={clickHandler} />
          </div>
        ))}
      </div>
      {flag && <Navigate to="/card" />}
      <Routes>
        <Route path="/card" element={<ListCard />}></Route>
      </Routes>
    </div>
  );
};

export default ListBucket;
