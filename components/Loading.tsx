"use client";

import "ldrs/ring";
import { helix } from "ldrs";

// Default values shown
const Loading = () => {
  helix.register();
  return (
    // Loader
    <div className="h-full flex items-center justify-center">
      <l-helix size="55" speed="2.5" color="red"></l-helix>
    </div>
  );
};

export default Loading;
