// server/templates/operation-order.js
const generateOperationOrder = (params) => {
  return {
    mission: `Execute search warrant at ${params.address}`,
    personnel: params.team.map(member => ({
      name: member.name,
      role: member.role,
      vehicle: member.callSign
    })),
    timeline: {
      briefing: "0800 hrs at HQ",
      execution: "0930 hrs on-site"
    }
  };
};