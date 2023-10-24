import jwt from 'jsonwebtoken';
import { sendResponse } from '../responses/index.js';

export function authorize() {
  return {
    before: async (request) => {
      try {
        const token = request.event.headers.authorization?.replace('Bearer ', '');

        if (!token) {
          return sendResponse(401, {
            success: false,
            message: 'Missing token: login required',
          });
        }

        request.event.auth = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return sendResponse(400, {
          success: false,
          message: 'Failed to verify token',
        });
      }
    },
  };
}

export function validateSchema(schema) {
  return {
    before: async (request) => {
      try {
        await schema.validateAsync(request.event.body);
      } catch (error) {
        return sendResponse(400, {
          success: false,
          message: error.details.at(0).message,
        });
      }
    },
  };
}
