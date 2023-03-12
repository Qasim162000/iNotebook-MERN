import { useContext } from "react";
import NoteContext from "./context/notes/NoteContext";

function NoteItem(props) {
  const { title, description } = props.note;
  const { deleteNote } = useContext(NoteContext);

  return (
    <div className="col-md-3 my-3">
      <div className="card" style={{ width: "18rem", textAlign: "center" }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <i
            className="fa-solid fa-trash mx-1"
            onClick={() => {
              deleteNote(props.note._id);
              props.showAlert("Note Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-1"
            onClick={() => {
              props.updateNote(props.note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
