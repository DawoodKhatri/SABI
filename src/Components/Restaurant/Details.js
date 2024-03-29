import AddRestaurant from "./AddRestaurant";
export default function Details(props) {
  return (
    <>
      <AddRestaurant />
      <div className="container-fluid row shadow w-auto my-3 mx-3 p-3 rounded">
        <div className="col-12 col-md-6 d-flex my-auto p-3 text-center">
          <img
            src={props.data.images[0]}
            class="restoImages d-block w-75 mx-auto rounded rounded-2 "
            alt=""
            data-bs-toggle="modal"
            data-bs-target="#addRestaurantModal"
          />
          {/* <div
            id="carouselExampleControls"
            class="carousel slide w-75 mx-auto rounded rounded-2 border border-3 border-warning"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner ">
              <div class="carousel-item active">
                <img
                  src="https://b.zmtcdn.com/data/pictures/5/41955/5f450dfb9aa465ac51ac6407ab639b88.jpg?crop=200%3A200%3B%2A%2C%2A"
                  class="restoImages d-block w-100"
                  alt=""
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://b.zmtcdn.com/data/pictures/5/41955/674b03b9cc05b19111c029b454b40a1d.jpg?crop=200%3A200%3B%2A%2C%2A"
                  class="restoImages d-block w-100"
                  alt=""
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://b.zmtcdn.com/data/pictures/5/41955/5f450dfb9aa465ac51ac6407ab639b88.jpg"
                  class="restoImages d-block w-100"
                  alt=""
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div> */}
        </div>
        <div className="col-12 col-md-6  text-center my-auto">
          <h1 className="text-warning mt-2 mb-4">{props.data.name}</h1>
          <p className="my-2">
            {props.data.cuisines.map(
              (cuisine, i) => `${i > 0 ? ", " : ""}${cuisine}`
            )}
          </p>
          <p className="my-2">{props.data.address}</p>
          <p className="my-2">Contact: {props.data.contacts.toString()}</p>
        </div>
      </div>
    </>
  );
}
