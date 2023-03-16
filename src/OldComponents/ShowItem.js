export default function ShowChef(props) {
  return (
    <>
      <div
        class="modal fade"
        id="showItemModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {props.title}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.setCurr}
              ></button>
            </div>
            <div class="modal-body text-center">
              <div className="my-3 text-center">
                <img
                  className="w-50 h-auto rounded rounded-2 shadow"
                  src={props.image}
                  alt=""
                />
              </div>
              <div class="mb-3 text-center">
                <h3>{props.name}</h3>
              </div>
              {props.description.map((fields) => {
                return (
                  <div class="mb-3 fs-5">
                    <hr />
                    {Array.from(fields).map((data) => {
                      return <p>{data}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
