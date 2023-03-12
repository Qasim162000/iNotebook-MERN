import React from "react";
import { useState } from "react";
import { useContext } from "react";
import NoteContext from "./context/notes/NoteContext";

const AddNote = (props) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Note Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            minLength={5}
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={onChange}
            minLength={5}
            value={note.description}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
            required
          />
        </div>
        <button
          disabled={
            note.title.length < 5 ||
            note.description.length < 5 ||
            note.tag.length < 3
          }
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
