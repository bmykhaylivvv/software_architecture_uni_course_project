/**
 * Test middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function verifyUser(req, res, next) {
  console.log('Verified')

  next();
}