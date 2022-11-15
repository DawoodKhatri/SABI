import { useState } from "react";
export default function AddRestaurant(props) {
  const [State, setState] = useState("Initial");
  const [file, setFile] = useState();
  var api = "https://6brpii.sse.codesandbox.io";
  // var api = "http://localhost:4040";
  const handleFile = (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementsByClassName("dishImage")[0].src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const updateDetails = () => {
    const query = `/?uid=${props.userData.id}&name=${
      document.getElementById("restoName").value
    }&images=${document.getElementById("restoImages").files}&speciality=${
      document.getElementById("restoSpecialities").value
    }&address:${document.getElementById("restoAddress").value}`;
  };
  return (
    <>
      <div
        class="modal fade"
        id="addRestaurantModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Restaurant Details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Restaurant Name</label>
                <input
                  id="restoName"
                  class="form-control"
                  placeholder="Enter Restaurant Name"
                />
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Upload Images of Restaurant</label>
                <input
                  id="restoImages"
                  class="form-control"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFile}
                  multiple
                />
                {file && (
                  <div className="my-3 text-center">
                    <img
                      className="restoImages w-50 p-3 border border-2 border-warning rounded"
                      src=""
                      alt=""
                    />
                  </div>
                )}
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Restaurant Specialities</label>
                <input
                  id="restoSpecialities"
                  class="form-control"
                  placeholder="Enter Restaurant Specialities"
                />
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Restaurant Address</label>
                <textarea
                  id="restoAddress"
                  class="form-control"
                  placeholder="Enter Restaurant Address"
                />
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Restaurant Contact</label>
                <input
                  id="restoContact"
                  class="form-control"
                  placeholder="Enter Restaurant Contact Number"
                />
                <div class="invalid-feedback"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-warning">
                Update Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
