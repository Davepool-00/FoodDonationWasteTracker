import React from "react";

const AboutPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Us</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Our Mission</h4>
          <p>
            Our mission is to reduce food waste and connect excess food to those in need. Through our platform, donors can easily share their surplus food with charitable organizations or individuals looking for meals.
          </p>
          <p>
            We aim to fight hunger and protect the environment by making food donations easy, safe, and effective.
          </p>
        </div>
        <div className="col-md-6">
          <h4>What We Do</h4>
          <p>
            We work closely with local organizations to help distribute food to those who need it the most. By fostering a collaborative approach, we strive to reduce food waste while providing for communities in need.
          </p>
          <p>
            Our platform ensures that food donations are handled efficiently, connecting donors with recipients and minimizing waste in the process.
          </p>
        </div>
      </div>
      <hr />
      <div className="text-center mt-4">
        <p>
          Join us in our mission to reduce food waste and make a difference in the lives of others!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
