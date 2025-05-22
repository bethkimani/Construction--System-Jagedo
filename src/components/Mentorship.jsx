import React, { useState } from 'react';

const Mentorship = ({ builders }) => {
  const seniorBuilders = builders.filter(b => b.experienceLevel === 'senior');
  const juniorBuilders = builders.filter(b => b.experienceLevel === 'junior');
  const [pairings, setPairings] = useState({});
  const [hoursLogged, setHoursLogged] = useState({});

  const handleMentorshipPairing = (seniorId, juniorId) => {
    setPairings((prev) => ({ ...prev, [seniorId]: juniorId }));
    console.log(`Mentor ${seniorId} paired with ${juniorId}`);
  };

  const handleLogHours = (seniorId, hours) => {
    setHoursLogged((prev) => ({ ...prev, [seniorId]: hours }));
    console.log(`Logged ${hours} hours for mentor ${seniorId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Mentorship Program</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {seniorBuilders.length === 0 || juniorBuilders.length === 0 ? (
          <p className="text-text-gray">Not enough builders for mentorship pairing.</p>
        ) : (
          seniorBuilders.map(senior => (
            <div key={senior.id} className="mb-4">
              <p className="text-text-gray">
                {senior.first_name} {senior.last_name} (Senior - {senior.specialization})
              </p>
              <select
                value={pairings[senior.id] || ''}
                onChange={(e) => handleMentorshipPairing(senior.id, e.target.value)}
                className="w-full p-2 border border-light-gray rounded mt-2"
              >
                <option value="">Assign Junior Builder</option>
                {juniorBuilders.map(junior => (
                  <option key={junior.id} value={junior.id}>
                    {junior.first_name} {junior.last_name} (Junior - {junior.specialization})
                  </option>
                ))}
              </select>
              {pairings[senior.id] && (
                <div className="mt-2">
                  <input
                    type="number"
                    placeholder="Hours logged"
                    onChange={(e) => handleLogHours(senior.id, e.target.value)}
                    className="w-full p-2 border border-light-gray rounded mt-2"
                  />
                  <p>Hours Logged: {hoursLogged[senior.id] || 0}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mentorship;