
import React from 'react';

const GoogleMap = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7234567890123!2d73.9234567!3d18.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI3JzI0LjQiTiA3M8KwNTUnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin&q=Konark+Puram+Business+Hub+Kondhwa+Pune";

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location - Konark Puram Business Hub"
      />
    </div>
  );
};

export default GoogleMap;
