// server/evidence.js
const createSeizureRecord = (item) => {
  return {
    caseID: generateUID(),
    description: item.desc,
    locationFound: GPScoordinates,
    handler: currentOfficer,
    timestamp: new Date().toISOString(),
    continuityLog: [] // Updated per transfer
  };
};
