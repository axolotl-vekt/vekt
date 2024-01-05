import React from "react";
import Navbar, { items } from "./Navbar";

const About = () => {
  return (
    <div>
      <div>
        <Navbar items={items} />
      </div>
      <h1>About Us</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        For more information, please contact us at our{" "}
        <a href="http://localhost:8080/contact">contact</a> page.
      </p>
    </div>
  );
};

export default About;
