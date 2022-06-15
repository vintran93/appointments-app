import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import UserService from '../services/user.service';
import moment from 'moment';
import classes from '../styles/Doctors.module.css';

const Appointment = () => {
  const [content, setContent] = useState('');
  const [doctor, setDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    UserService.getAppointment(currentUser.user.id, id).then(
      response => {
        setContent(response.data);
        return response.data.doctor_id;
      },
      error => {
        setLoading(false);
        setError(true);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    ).then(doctorId => UserService.getDoctor(doctorId))
      .then(response => {
        setLoading(false);
        setDoctor(response.data);
      });
  }, []);
  
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  
  const handleClick = () => {
    setLoading(true);
    UserService.deleteAppointment(currentUser.user.id, id).then(() => {
      alert.show('Appointment Deleted', {
        type: 'success',
        timeout: 5000,
      });
      setLoading(false);
      setSuccessful(true);
    });
  };

  if (successful) {
    return <Redirect to="/appointments" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        {loading && <span className="spinner-border spinner-border-lg" />}
        {
          doctor && (
          <div>
            <img src={doctor.image} alt={doctor.name} className={`rounded-circle ${classes.img}`} />
            <br></br><br></br>
            <p>
              Appointment Id: &nbsp;
              {content.id}
            </p>
            <p>
              Provider: &nbsp;
              <Link to={`/doctors/${doctor.id}`}>
                {doctor.name} - {doctor.specialty} 
              </Link>
            </p>
            <p>
              Address: {doctor.address}
            </p>
            <p>
             When: &nbsp; 
              {moment(content.appointment_date).add(5, 'hours').format('LLL')} 
            </p>
            <p> What to bring: </p>
            <p>  1. Photo ID </p>
            <p>  2. Insurance Card </p>
            <p>  3. Arrive 10 minutes early to complete paperwork. </p>
            <p> * Any cancellations must be at least 24 hours in advance to avoid cancellation fees. </p>
            <button className="btn btn-primary btn-block" type="button" onClick={handleClick} disabled={loading}>
              Cancel
            </button>
          </div>
          )
        }
        {
          error && <p>{content}</p>
        }
      </header>
    </div>
  );
};

export default Appointment;
