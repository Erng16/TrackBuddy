const TrackingModel = {
    // Fetch basic info of a parcel by tracking_id
    getBasicInfoByTrackingId: async (db, trackingId) => {
      try {
        const query = `
          SELECT 
            p.tracking_id, 
            te.tracking_status, 
            te.timestamp, 
            s.sender_fname AS sender_name, 
            r.recipient_name
          FROM Parcel p
          JOIN TrackingEvent te ON p.tracking_id = te.tracking_id
          LEFT JOIN Sender s ON p.sender_id = s.sender_id
          JOIN Recipient r ON p.recipient_id = r.recipient_id
          WHERE p.tracking_id = ?
          ORDER BY te.timestamp DESC
          LIMIT 1
        `;
        return await db.query(query, [trackingId]);
      } catch (error) {
        throw new Error('Error fetching basic info: ' + error.message);
      }
    },
  
    // Fetch journey details of a parcel by tracking_id
    getJourneyDetailsByTrackingId: async (db, trackingId) => {
      try {
        const query = `
          SELECT 
          te.event_id, 
          te.tracking_status, 
          te.timestamp,
          a.district AS location_district,
          a.province AS location_province,
          te.note
        FROM TrackingEvent te
        LEFT JOIN Distribution d ON te.dist_id = d.dist_id
        LEFT JOIN Address a ON d.dist_addr_id = a.address_id
        WHERE te.tracking_id = ?
        ORDER BY te.timestamp DESC; -- Sort journey from latest to oldest
        `;
        return await db.query(query, [trackingId]);
      } catch (error) {
        throw new Error('Error fetching journey details: ' + error.message);
      }
    },
  };
  
  module.exports = TrackingModel;
  