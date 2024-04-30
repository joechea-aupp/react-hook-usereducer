import React from "react";

const CourseInfo = ({ course, onEdit }) => (
  <div className="course-info">
    <div className="course-title">{course.courseTitle}</div>
    <div className="course-category">{course.category}</div>
    <div className="course-lesson-count">Lessons: {course.lessonCount}</div>
    <div className="edit-course-button" onClick={onEdit}>
      Edit Course
    </div>
    <div className="course-lessons">
      {course.lessons &&
        course.lessons.map(({ lessonId, title, type }) => (
          <div className="lessons" key={lessonId}>
            <div className="lesson-title">{title}</div>
            <div className="lesson-type">{type.toUpperCase()}</div>
          </div>
        ))}
    </div>
  </div>
);

const CourseDetails = ({ course, createCourse, onEdit }) => {
  return (
    <div className="course-details">
      <div className="crs-title">Course Viewer</div>
      <div className="controls">
        {!course ? (
          <button className="course-action-btn" onClick={createCourse}>
            Create Course
          </button>
        ) : null}
      </div>
      {!course ? (
        <div className="nca">No Course Available</div>
      ) : (
        <CourseInfo course={course} onEdit={onEdit} />
      )}
    </div>
  );
};

export default CourseDetails;
