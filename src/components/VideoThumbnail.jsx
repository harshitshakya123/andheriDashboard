// import { useState } from "react";

// const VideoThumbnail = ({ thumbnail, video }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{ position: "relative", width: "250px", height: "150px" }}
//     >
//       {hovered ? (
//         <video width="250" height="150" controls>
//           <source src={video} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <img src={thumbnail} alt="Thumbnail" style={{ width: "100%", height: "100%" }} />
//       )}
//     </div>
//   );
// };

// export default VideoThumbnail;

import React, { useState, useRef } from "react";

const VideoThumbnail = ({ thumbnail, video }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    videoRef.current.pause();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", width: "250px", height: "150px" }}
    >
      {hovered ? (
        <video
          ref={videoRef}
          width="250"
          height="150"
          controls
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={thumbnail} alt="Thumbnail" style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
};

export default VideoThumbnail;
