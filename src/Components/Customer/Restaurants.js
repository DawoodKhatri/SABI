import { useState, useEffect } from "react";
import ItemsView from ".././ItemsView";

export default function Restaurants(props) {
  const [restaurants, setRestaurants] = useState();
  var api = process.env.REACT_APP_SERVER;
  useEffect(() => {
    var query = `/all/?type=restaurants`;
    !restaurants &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          setRestaurants(result.data);
        });
      });
  });
  return (
    <>
      <ItemsView
        title="Top Restaurants"
        items={restaurants}
        image="images"
        // setCurr={setCurr}
        // description="rating"
      />
    </>
  );
}
