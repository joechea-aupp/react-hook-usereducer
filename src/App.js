import React, {useState} from "react";
import CourseBuilder from "./components/CourseBuilder";
import CourseDetails from "./components/CourseDetails";

const App = () => {
  const [showCourseBuilder, setShowCourseBuilder] = useState(false);
  const [course, setCourse] = useState();

  return (
    <div className="container">
      {showCourseBuilder ? (
        <CourseBuilder
          course={course}
          onCreate={c => {
            setCourse(c);
            setShowCourseBuilder(false);
          }}
          onCancel={() => setShowCourseBuilder(false)}
        />
      ) : (
        <CourseDetails
          course={course}
          createCourse={() => setShowCourseBuilder(true)}
          onEdit={() => setShowCourseBuilder(true)}
        />
      )}
    </div>
  );
};

export default App;
