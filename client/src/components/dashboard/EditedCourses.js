import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse, updateCourse } from "../../actions/profile";
// import regImg from "../../img/img3.png";
import { getCourseById } from "../../actions/profile";
import { Editor } from "@tinymce/tinymce-react";

const AddCourse = ({
  course: { course },
  getCourseById,
  match,
  history,
  updateCourse,
}) => {
  const inputRef = useRef();
  useEffect(() => {
    getCourseById(match.params.id);
  }, [getCourseById, match.params.id]);
  const [name, setName] = useState(course && course.name);
  const [description, setDescription] = useState(course && course.description);
  const [file, setFile] = useState();
  return (
    <Fragment>
      {" "}
      <h1 class=".text-secondary">
        {" "}
        <i class="fas fa-laptop-code text-secondary"></i> &nbsp; Edit Your
        Course
      </h1>
      {/* <div className="imgLogin">
        <img src={regImg} alt="imgLogin" width="300" height="500"></img>
      </div> */}
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
          updateCourse(course._id, formData, history);
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
        {/* <div class="form-group">
          <textarea
            placeholder="* Course Description"
            cols="40"
            rows="20"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div> */}
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
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourseById, updateCourse })(
  AddCourse
);
