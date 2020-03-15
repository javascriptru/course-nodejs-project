import React from 'react';

function HomeMenu() {
  return (
    <ul className="list-group sidebar">
      <li className="list-group-item dropdown">
        <a className="nav-link dropdown-toggle" id="dropdown1" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">Camera & Photo</a>
        <ul className="dropdown-menu" aria-labelledby="dropdown1">
          <li className="dropdown-item"><a>Accessories</a></li>
          <li className="dropdown-item"><a>Action Cameras & Accessories</a></li>
          <li className="dropdown-item"><a>Binoculars, Telescopes & Optics</a></li>
          <li className="dropdown-item"><a>Camcorders</a></li>
          <li className="dropdown-item"><a>Digital Cameras</a></li>
          <li className="dropdown-item"><a>Digital Picture Frames</a></li>
          <li className="dropdown-item"><a>Film Cameras</a></li>
          <li className="dropdown-item"><a>Film Scanners</a></li>
          <li className="dropdown-item"><a>Flashes</a></li>
          <li className="dropdown-item"><a>Lenses</a></li>
          <li className="dropdown-item"><a>Photo Printers</a></li>
          <li className="dropdown-item"><a> Slide Projectors</a></li>
          <li className="dropdown-item"><a>Slide Viewers</a></li>
          <li className="dropdown-item"><a>Surveillance Cameras</a></li>
          <li className="dropdown-item"><a>Tripods & Monopods</a></li>
          <li className="dropdown-item"><a>Underwater Video & Photography</a></li>
          <li className="dropdown-item"><a>Video Projectors</a></li>
        </ul>
      </li>
      <li className="list-group-item dropdown">
        <a className="nav-link dropdown-toggle" id="dropdown2" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">Home Cinema, TV & Video</a>
        <ul className="dropdown-menu" aria-labelledby="dropdown2">
          <li className="dropdown-item"><a>Home Cinema, TV & Video</a></li>
        </ul>
      </li>
      <li className="list-group-item dropdown">
        <a className="nav-link dropdown-toggle" id="dropdown3" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">Mobile Phones</a>
        <ul className="dropdown-menu" aria-labelledby="dropdown3">
          <li className="dropdown-item"><a>Mobile Phones</a></li>
        </ul>
      </li>
      <li className="list-group-item dropdown">
        <a className="nav-link dropdown-toggle" id="dropdown4" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">Computers & Components</a>
        <ul className="dropdown-menu" aria-labelledby="dropdown4">
          <li className="dropdown-item"><a>Computers & Components</a></li>
        </ul>
      </li>
    </ul>
  );
}

export default HomeMenu;
