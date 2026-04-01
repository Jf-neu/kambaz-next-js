"use client"
import EnvironmentVariables from "./environment-variables";
import PathParameters from "./path-parameters";
import QueryParameters from "./query-parameters";
import WorkingWithObjects from "./working-with-objects";
import WorkingWithArrays from "./working-with-arrays";
import HttpClient from "./http-client";
import WorkingWithObjectsAsynchronously from "./working-with-objects-asynchronously";
import WorkingWithArraysAsynchronously from "./working-with-arrays-asynchronously";

export default function Lab5() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
           Welcome
        </a>
      </div><hr/>
      <EnvironmentVariables/>

      <PathParameters/>

      <QueryParameters/>

      <WorkingWithObjects/>

      <WorkingWithArrays/>

      <HttpClient />

      <WorkingWithObjectsAsynchronously />

      <WorkingWithArraysAsynchronously />
    </div>
);}

