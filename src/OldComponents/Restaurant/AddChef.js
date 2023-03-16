import { useState } from "react";
export default function AddChef(props) {
  const [file, setFile] = useState();
  const handleFile = (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementsByClassName("chefImage")[0].src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  return (
    <>
      <div
        class="modal fade"
        id="addChefModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add New Chef
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
                <label class="form-label">Chef Name</label>
                <input
                  id="chefName"
                  class="form-control"
                  placeholder="Enter Chef Name"
                />
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Upload Photo of Chef</label>
                <input
                  id="chefImage"
                  class="form-control"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFile}
                />
                {file && (
                  <div className="my-3 text-center">
                    <img
                      className="chefImage w-50 p-3 border border-2 border-warning rounded"
                      src=""
                      alt=""
                    />
                  </div>
                )}
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Chef Speciality</label>
                <textarea
                  id="chefSpeciality"
                  class="form-control"
                  placeholder="Enter Chef Speciality"
                />
                <div class="invalid-feedback"></div>
              </div>
              <div class="mb-3">
                <label class="form-label">Chef Experience</label>
                <input
                  id="chefExperience"
                  class="form-control"
                  placeholder="Enter Chef Experience in Years"
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
                Add Chef
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
