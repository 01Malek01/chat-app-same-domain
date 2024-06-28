import { NextFunction, Request, Response } from "express";
import { body, validationResult ,  } from "express-validator";

const validateUser = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty."),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("gender").isIn(["male", "female"]).withMessage("Gender must be male or female."),
  body('displayName').trim().isLength({ min: 1 }).withMessage('Display name must not be empty.'),

  // Process the request after validation and sanitization.
  (req:Request, res:Response, next:NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Send the errors back with the response.
      res.status(400).json({ errors: errors.array() });
    } else {
      // Data is valid. Proceed to the next middleware or controller.
      next();
    }
  },
];

export default validateUser;
