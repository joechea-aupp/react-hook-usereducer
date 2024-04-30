import React, { useReducer } from "react";
import LessonBuilder from "./LessonBuilder";
import FormFieldLayout from "./FormFieldLayout";
import uuid from "uuid/v4";

const initState = (course) => {
  return !course
    ? {
        courseId: uuid(),
        courseTitle: "",
        category: "UI/UX",
        lessonCount: 0,
        lessons: [],
      }
    : course;
};

const courseReducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        courseTitle: action.title,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.category,
      };
    case "ADD_LESSON":
      return {
        ...state,
        lessonCount: state.lessonCount + 1,
        lessons: [
          ...state.lessons,
          {
            lessonId: action.lesson.lessonId,
            title: action.lesson.lessonTitle,
            type: action.lesson.lessonType,
          },
        ],
      };
    case "DELETE_LESSON":
      return {
        ...state,
        lessonCount: state.lessonCount - 1,
        lessons: state.lessons.filter((l) => l.lessonId !== action.lessonId),
      };
    default: {
      throw new Error("This action could not be handled!");
    }
  }
};

const CourseBuilder = ({ course, onCreate, onCancel }) => {
  /* dispatcher take object as a trigger to update state, state is the actually data that has been
   * updated, courseReducer which is the first parameter of useReducer is a main the transform state
   * into another, where the second parameter is use to popular the default state, however the third parameter will take the second parameter and run against it, in our case initState will check if
   * it has value if not it will return value back as an updated initial state.
   */
  const [state, dispatch] = useReducer(courseReducer, course, initState);
  return (
    <div className="course-builder">
      <div className="crs-title">Course Builder</div>
      <FormFieldLayout title="Title">
        <input
          type="text"
          value={state.courseTitle}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", title: e.target.value })
          }
        />
      </FormFieldLayout>
      <FormFieldLayout title="Category">
        <select
          value={state.category}
          onChange={(e) =>
            dispatch({
              type: "SET_CATEGORY",
              category: e.target.value,
            })
          }
        >
          <option>UI/UX</option>
          <option>JavaScript</option>
          <option>PHP</option>
          <option>Database</option>
          <option>Node.js</option>
        </select>
      </FormFieldLayout>
      <LessonBuilder
        lessons={state.lessons}
        onAdd={(lesson) =>
          dispatch({
            type: "ADD_LESSON",
            lesson,
          })
        }
        onRemove={(lessonId) => dispatch({ type: "DELETE_LESSON", lessonId })}
      />
      <button
        className="course-action-btn"
        onClick={() => (state.courseTitle ? onCreate(state) : null)}
      >
        Done
      </button>
      <button className="course-action-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default CourseBuilder;
