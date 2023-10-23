import jwt from 'jsonwebtoken';

export function authorize() {
  return {
    before: async (request) => {
      try {
        const token = request.event.headers.authorization?.replace('Bearer ', '');

        if (!token) {
          return sendResponse(401, {
            message: 'Missing token: login required',
          });
        }

        request.event.auth = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return sendResponse(400, {
          message: 'Failed to verify token',
        });
      }
    },
  };
}
