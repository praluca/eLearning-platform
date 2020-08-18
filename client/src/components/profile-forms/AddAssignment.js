import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAssignment } from "../../actions/profile";
// import regImg from "../../img/img3.png";
import { Editor } from "@tinymce/tinymce-react";
const AddAssignment = ({ addAssignment }) => {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   courseName: "",
  //   problemDescription: "",
  // });
  // const { title, courseName, problemDescription } = formData;
  const [title, setTitle] = useState("");
  const [problemDescription, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      {" "}
      <h1 class=".text-secondary">
        {" "}
        <i class="fas fa-keyboard"></i> &nbsp; Add Your Assignment
      </h1>
      {/* <div className="imgLogin">
        <img src={regImg} alt="imgLogin" height="550"></img>
      </div> */}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addAssignment({ title, courseName, problemDescription });
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Assignment Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
        </div>
        <div>
          <input
            type="text"
            placeholder="Course name"
            name="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        {/* <div class="form-group">
          <textarea
            placeholder="*Problem Description"
            cols="40"
            rows="20"
            name="problemDescription"
            value={problemDescription}
            onChange={(e) => onChange(e)}
            required
          />
        </div> */}
        <Editor
          initialValue={problemDescription}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
          }}
          onChange={(e) =>
            setDescription(e.target.getContent({ format: "raw" }))
          }
        />
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Fragment>
  );
};

AddAssignment.propTypes = {
  addAssignment: PropTypes.func.isRequired,
};

export default connect(null, { addAssignment })(AddAssignment);
