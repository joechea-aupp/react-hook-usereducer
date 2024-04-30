import React, { useState } from "react";
import FormFieldLayout from "./FormFieldLayout";
import uuid from "uuid/v4";

const LessonBuilder = ({ onAdd, onRemove, lessons }) => {
  const [panel, setPanel] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState("Text");
  return (
    <div className="lesson-builder">
      <div className="lb-title">
        Lesson Builder
        <button onClick={() => setPanel(!panel)}>
          {panel ? "Close" : "+ Add"}
        </button>
      </div>
      {panel ? (
        <div className="lb-add-panel">
          <FormFieldLayout title="Title">
            <input
              type="text"
              value={lessonTitle}
              onChange={e => setLessonTitle(e.target.value)}
            />
          </FormFieldLayout>
          <FormFieldLayout title="Type">
            <select
              value={lessonType}
              onChange={e => setLessonType(e.target.value)}>
              <option>Text</option>
              <option>Video</option>
              <option>Audio</option>
            </select>
          </FormFieldLayout>
          <div className="form-field-holder">
            <button
              onClick={() => {
                onAdd({
                  lessonId: uuid(),
                  lessonTitle,
                  lessonType
                });

                setLessonTitle("");
                setLessonType("Text");
                setPanel(false);
              }}>
              Add
            </button>
            <button onClick={() => setPanel(false)}>Cancel</button>
          </div>
        </div>
      ) : null}
      <div className="lb-lessons">
        {lessons &&
          lessons.map(({ lessonId, title, type }) => (
            <div className="lessons" key={lessonId}>
              <div className="lesson-title">{title}</div>
              <div className="lesson-type">{type.toUpperCase()}</div>
              <div className="remove-btn" onClick={() => onRemove(lessonId)}>
                X
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LessonBuilder;
