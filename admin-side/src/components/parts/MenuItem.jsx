import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ title, name, except, includes = [] }) => {
    const location = useLocation();
    const isActive = () => {
        const currentPath = location.pathname;
        return (
            currentPath.startsWith(`/admin/${name}`) ||
            includes.some(route => currentPath.includes(route))
        );
    };

    const [isOpen, setIsOpen] = useState(isActive);

    useEffect(() => {
        setIsOpen(isActive());
    }, [location.pathname]);

    const toggleMenu = (e) => {
        e.preventDefault();
        setIsOpen(prev => !prev);
    };

    return (
        <li className="nav-item">
            <Link className={`nav-link ${isOpen ? '' : 'collapsed'}`} onClick={toggleMenu} aria-expanded={isOpen} aria-controls={`collapse${name}`}>
                <i className="fas fa-fw fa-wrench"></i>
                <span>{title}</span>
            </Link>
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
};

export default MenuItem;
