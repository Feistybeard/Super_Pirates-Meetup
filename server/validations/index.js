import joi from 'joi';

export const createMeetupSchema = joi.object({
  time: joi
    .string()
    .regex(/^\d{4}-\d{2}-\d{2} ([01]\d|2[0-3]):[0-5]\d$/) // ChatGPT YYYY-MM-DD HH:MM
    .required(),
  location: joi.string().required(),
  description: joi.string().required(),
  limit: joi.number().positive().required(),
  keywords: joi.array().items(joi.string()).required(),
});

/*
{
	"time": "2023-10-25 15:30",
	"location": "Stockholm",
	"description": "Javascript är dåtiden! Kom och lär dig massa trams.",
	"limit": 30,
	"keywords": ["JavaScript", "Frontend", "TypeScript"]
}
*/

export const addReviewSchema = joi.object({
  score: joi.number().positive().max(5),
  comment: joi.string(),
});

/*
{
  "score": 5
  "comment": "Best meet-up I've attended!"
}
*/
