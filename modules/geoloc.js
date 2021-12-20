/**
 *  get position method using navigator geo location
 *  @returns a Promise of Current Position in coordinate with timestamp
 */
const geoloc = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords, timestamp } = position,
        { longitude, latitude } = coords,
        pos = { longitude, latitude, timestamp };
      resolve(pos);
    });
  });
};

export default geoloc;
