import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse } from "../../actions/profile";
import regImg from "../../img/img3.png";
import { getCourseById } from "../../actions/profile";
import { Editor } from "@tinymce/tinymce-react";

const AddCourse = ({ addCourse, history, getCourseById, match }) => {
  const inputRef = useRef();
  useEffect(() => {
    getCourseById(match.params.id);
  }, [getCourseById, match.params.id]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  return (
    <Fragment>
      {" "}
      <h1 class=".text-secondary">
        {" "}
        <i class="fas fa-laptop-code text-secondary"></i> &nbsp; Add Your Course
      </h1>
      <form
        class="form"
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData();
          formData.append("video", file);
          formData.append("name", name);
          formData.append("description", description);
          console.log(formData);
          addCourse(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* Course Title"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          {/* <textarea
            placeholder="* Course Description"
            cols="40"
            rows="20"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          /> */}

          <Editor
            initialValue={description}
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
        </div>
        <div>
          <label htmlFor="file">Choose file to upload</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <input type="submit" class="btn btn-dark" />
        </div>
      </form>
    </Fragment>
  );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
};

export default connect(null, { addCourse, getCourseById })(AddCourse);
