import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export default function Loader(props) {
  return props.show ? (
    <div className={props.class || "loader"}>
      <CircularProgress />
    </div>
  ) : (
    ""
  );
}
