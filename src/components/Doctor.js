import React, { useState, useEffect } from 'react';
// import { Redirect, Link, useParams } from 'react-router-dom';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';
import classes from '../styles/Doctor.module.css';

const Doctor = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);
  const { id } = useParams();

  useEffect(() => {
    UserService.getDoctor(id).then(
      response => {
        setLoading(false);
        setContent(response.data);
      },
      error => {
        setLoading(false);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    );
  
  }, [id]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="text-center">
        {loading && <span className="spinner-border spinner-border-lg" />}
      </div>
      <div className={classes.Doctor}>
        <img src={content.image} className={classes.doctorImg} alt=''/>
        <div>
          <h2>
            {content.name}
          </h2>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Appointment Fee: &nbsp; $ 50.00
          </p>
          <p className={classes.badge}>
            Education: &nbsp;&nbsp;
            {content.education}
          </p>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Specialty: &nbsp;&nbsp;
            {content.specialty}
          </p>
          <p className={classes.badge}>
            Experience: &nbsp;
            {content.experience}
          </p>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.address}
          </p>
          <li>
            <Link
              to={{
                pathname: '/appointments/new',
                doctorId: content.id,
              }}
              className={classes.btn}
            >
              Book An Appointment
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

