import React, { useState } from "react";

const ToggleDescription = ({ initialDescription }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  return (
    <>
      {showFullDescription ? (
        <>
          <p>{initialDescription}</p>
          <button className="see-less" onClick={toggleDescription}>
            Hide Description
          </button>
        </>
      ) : (
        <>
          <p>{initialDescription.substring(0, 0)}...</p>
          <button className="see-more" onClick={toggleDescription}>
            Description
          </button>
        </>
      )}
    </>
  );
};

export default ToggleDescription;