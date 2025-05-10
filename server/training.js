// server/training.js
const checkCertifications = (officerID) => {
  return trainingDB.filter(record => 
    record.officerID === officerID && 
    record.expiry > new Date()
  );
};
