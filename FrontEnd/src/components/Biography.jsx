import React from "react";

function Biography({ imageurl }) {
  return (
    <>
      <div className="container biography ">
        <div className="banner ">
          <img src={imageurl} alt="aboutImg" />
        </div>
        <div className="banner">
          <h5>Biography</h5>
          <h3>Who We Are</h3>
          <p>
            The Hospital Management System (HMS) is a comprehensive software
            solution designed to streamline and automate the operations of
            healthcare facilities. Its primary aim is to enhance the efficiency
            of hospital management by integrating various administrative and
            clinical processes into a unified platform. The HMS offers
            functionalities for managing patient records, appointment
            scheduling, billing, inventory, and more, facilitating smooth
            communication and coordination among healthcare professionals.
          </p>
          <p>
           
            Enables the registration and management of patient information,
            including personal details, medical history, and treatment records.
          </p>
          <p>
             Provides tools for booking, rescheduling,
            and tracking patient appointments, optimizing the use of medical
            staff and resources.
          </p>
          <p>
            Provides tools for booking, rescheduling, and tracking patient
            appointments, optimizing the use of medical staff and resources.
          </p>
          <p>
            The HMS is designed to be scalable and adaptable to the specific
            needs of various healthcare facilities, from small clinics to large
            hospitals. By leveraging technology, the HMS aims to support
            healthcare providers in delivering high-quality care and managing
            their operations effectively.
          </p>
        </div>
      </div>
    </>
  );
}

export default Biography;
