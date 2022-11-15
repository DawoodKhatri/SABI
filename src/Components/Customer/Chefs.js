import { useState, useEffect } from "react";
import ItemsView from ".././ItemsView";

export default function Restaurants(props) {
  const [chefs, setChefs] = useState();
  var api = "https://6brpii.sse.codesandbox.io";
  useEffect(() => {
    var query = `/all/?type=chefs`;
    !chefs &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          setChefs(result.data);
        });
      });
  });

  return (
    <>
      <ItemsView
        title="Our Top Chefs"
        items={chefs}
        image="photo"
        description="rating"
      />
    </>
  );
}
