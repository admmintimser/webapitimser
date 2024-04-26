export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine el nombre de la cookie basado en el rol del usuario
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expiresIn: new Date(
        Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
