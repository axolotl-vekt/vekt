// import React, { useRef, useState, useEffect, createRef } from 'react';
// import ReactDOM from 'react-dom';
// import gsap from 'gsap';
// import { Link } from 'react-router-dom';

// export const items = [
//   {
//     name: 'Home',
//     color: '#f44336',
//     to: '/homepage',
//   },
//   {
//     name: 'About',
//     color: '#e91e63',
//     to: '/about',
//   },
//   {
//     name: 'Contact',
//     color: '#9c27b0',
//     to: '/contact',
//   },
//   {
//     name: 'Games',
//     color: '#673ab7',
//     to: '/games',
//   },
// ];

// export const Navbar = ({ items }) => {
//   const $root = useRef(null);
//   const $indicator1 = useRef(null);
//   const $indicator2 = useRef(null);
//   const $items = useRef(items.map(() => createRef()));
//   const [active, setActive] = useState(0);

//   const animate = () => {
//     const menuOffset = $root.current.getBoundingClientRect();
//     const activeItem = $items.current[active].current;
//     const { width, height, top, left } = activeItem.getBoundingClientRect();

//     const settings = {
//       x: left - menuOffset.x,
//       y: top - menuOffset.y,
//       width: width,
//       height: height,
//       backgroundColor: items[active].color,
//       ease: 'elastic.out(.7, .7)',
//       duration: 0.8,
//     };

//     gsap.to($indicator1.current, {
//       ...settings,
//     });

//     gsap.to($indicator2.current, {
//       ...settings,
//       duration: 1,
//     });
//   };

//   useEffect(() => {
//     animate();
//     const handleResize = () => animate();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [active]);

//   return (
//     <nav>
//       <div className="navBarContainer">
//         <ul className="navBarList">
//           <li className="navigationLinks">
//             <Link
//               to="/homepage"
//               style={{ textDecoration: 'none', color: 'white' }}
//             >
//               <strong>Home</strong>
//             </Link>
//           </li>
//           <li className="navigationLinks">
//             <Link
//               to="/about"
//               style={{ textDecoration: 'none', color: 'white' }}
//             >
//               <strong>About</strong>
//             </Link>
//           </li>
//           <li className="navigationLinks">
//             <Link
//               to="/contact"
//               style={{ textDecoration: 'none', color: 'white' }}
//             >
//               <strong>Contact</strong>
//             </Link>
//           </li>
//           <li className="navigationLinks">
//             <Link
//               to="/games"
//               style={{ textDecoration: 'none', color: 'white' }}
//             >
//               <strong>Games</strong>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default { Navbar, Items };