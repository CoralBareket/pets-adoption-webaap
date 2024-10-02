import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/UserProfile.css';
import logo2 from '../assets/images/logos/logo2.png'; 

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // מצב עריכה
  const [isSaving, setIsSaving] = useState(false); // מצב לטעינת השמירה
  const [editData, setEditData] = useState({
    phoneNumber: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { 
            Authorization: `Bearer ${JSON.parse(loggedInUser).token}` 
          }
        });
        setUserData(response.data);
        setEditData({
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true); // מעבר למצב עריכה
  };

  const handleCancel = () => {
    setIsEditing(false); // ביטול עריכה
    setEditData({
      phoneNumber: userData.phoneNumber,
      email: userData.email,
    });
  };

  const handleSave = async () => {
    setIsSaving(true); // התחלת טעינה
    try {
      const response = await axios.put('/api/users/profile', editData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
        }
      });
      setUserData(response.data); // עדכון המידע המוצג לאחר שמירה
      setIsEditing(false); // יציאה ממצב עריכה
      setIsSaving(false); // סיום טעינה
    } catch (error) {
      console.error('Failed to update user data', error);
      setIsSaving(false); // סיום טעינה גם במקרה של שגיאה
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>אזור אישי</h1>
        <img
          src={logo2}
          alt="Logo"
          className="logo-small"
          onClick={() => navigate('/')} 
        />
      </div>
      <div className="user-info">
        {isEditing ? (
          <>
            <p>
              מספר טלפון: 
              <input
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleChange}
              />
            </p>
            <p>
              אימייל: 
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </p>
            <button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'שומר...' : 'שמור'}
            </button>
            <button onClick={handleCancel} disabled={isSaving}>
              ביטול
            </button>
          </>
        ) : (
          <>
            <p>שם מלא: {userData.fullName}</p>
            <p>מספר טלפון: {userData.phoneNumber}</p>
            <p>אימייל: {userData.email}</p>
            <button onClick={handleEdit}>ערוך</button>
          </>
        )}
      </div>
      <h2>היסטוריית האימוץ שלך</h2>
      <div className="adoption-history">
        {userData.adoptionHistory && userData.adoptionHistory.length > 0 ? (
          <ul>
            {userData.adoptionHistory.map(adoption => (
              <li key={adoption.pet._id}>
                {adoption.pet.name} - אומץ בתאריך {new Date(adoption.adoptionDate).toLocaleDateString('he-IL')}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-adoptions">
            עדיין לא אימצת חיות מחמד. <a href="/matching-quiz">מצא את ההתאמה המושלמת עכשיו!</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
