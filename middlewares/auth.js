import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

// Middleware to authenticate frontend users
export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

// Middleware to authenticate reception users
export const isReceptionistOrAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.receptionToken || req.cookies.adminToken;
    if (!token) {
      return next(new ErrorHandler("Receptionist or Admin is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Receptionist" && req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};


// Middleware para autenticar usuarios de cualquier tipo
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken || req.cookies.patientToken || req.cookies.receptionToken;
  if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 401));
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);

      if (!req.user) {
          return next(new ErrorHandler("User not found!", 404));
      }

      next();
  } catch (error) {
      return next(new ErrorHandler("Invalid Token!", 401));
  }
});

// Middleware para verificar si el usuario tiene uno de los roles permitidos
export const hasRoles = (...allowedRoles) => {
  return catchAsyncErrors(async (req, res, next) => {
      const token = req.cookies.adminToken || req.cookies.patientToken || req.cookies.receptionToken;
      if (!token) {
          return next(new ErrorHandler("User is not authenticated!", 401));
      }

      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          req.user = await User.findById(decoded.id);

          if (!req.user || !allowedRoles.includes(req.user.role)) {
              return next(new ErrorHandler("Not authorized for this resource!", 403));
          }

          next();
      } catch (error) {
          return next(new ErrorHandler("Invalid Token!", 401));
      }
  });
};
