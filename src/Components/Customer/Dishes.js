import { useState, useEffect } from "react";
import ItemsView from ".././ItemsView";

export default function Dishes(props) {
  const [dishes, setDishes] = useState();
  var api = "https://6brpii.sse.codesandbox.io";
  useEffect(() => {
    var query = `/all/?type=dishes`;
    !dishes &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          console.log(result.data);

          setDishes(result.data);
        });
      });
  });
  return (
    <>
      <ItemsView
        title="Our Best Dishes"
        items={dishes}
        image="image"
        description="rate"
      />
    </>
  );
}
