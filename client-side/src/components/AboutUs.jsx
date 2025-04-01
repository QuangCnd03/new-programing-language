import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  const features = [
    {
      icon: "laptop-code",
      title: "Online Learning Platform",
      description: "Access our comprehensive courses anytime, anywhere",
      link: "#",
      linkText: "Visit E-Learning Platform"
    },
    {
      icon: "users",
      title: "Join Our Community",
      description: "Connect with students and instructors",
      link: "#",
      linkText: "Join Community"
    },
    {
      icon: "play-circle",
      title: "Video Tutorials",
      description: "Watch free educational content",
      link: "#",
      linkText: "Watch Tutorials"
    }
  ];

  return (
    <section className="about-us">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                <i className={`fas fa-${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href={feature.link} className="feature-link">
                {feature.linkText}
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
