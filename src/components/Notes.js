import { useEffect, useContext, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteContext from "./context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const { notes, getNotes, editNote } = useContext(NoteContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Edit Note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    minLength={5}
                    required
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    minLength={5}
                    required
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Your Notes</h1>
        <h6 className="container m-1">
          {notes.length === 0 && "No Notes to Display"}
        </h6>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              showAlert={props.showAlert}
              updateNote={updateNote}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
