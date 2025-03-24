import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const MenuItem = ({ title, name, except, includes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    return (
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" onClick={toggleMenu} aria-expanded={isOpen} aria-controls={`collapse${name}`}>
          <i className="fas fa-fw fa-wrench"></i>
          <span>{title}</span>
        </a>
        <div id={`collapse${name}`} className={`collapse ${isOpen ? 'show' : ''}`} aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            {except ? (
              <Link className="collapse-item" to={`/admin/${name}`}>List</Link>
            ) : (
              <>
                <Link className="collapse-item" to={`/admin/${name}`}>List</Link>
                <Link className="collapse-item" to={`/admin/${name}/create`}>Add new</Link>
              </>
            )}
          </div>
        </div>
      </li>
    );
}
export default MenuItem;