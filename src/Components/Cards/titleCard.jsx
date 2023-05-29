import React from 'react'

const TitleCard = ({ backgroundColor, title, subtitle, link }) => {
  return (
    <div className={`card ${backgroundColor} shadow`}>
      <div className="card-body">
        <h3 className="card-title text-white text-center">{title}</h3>
        <p className="card-subtitle text-white text-center">
          <a href="/login" className='text-white'>{link}</a> {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TitleCard