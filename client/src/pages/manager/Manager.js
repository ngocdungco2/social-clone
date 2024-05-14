import React from "react";
import Post from "../../components/post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./manager.scss";

const Manager = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts/unverified").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="manager">
      <div className="posts">
        {error
          ? "Something went wrong!"
          : isLoading
          ? "loading"
          : data.map((post) => <Post post={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default Manager;
