import joi from 'joi';

export const createMeetupSchema = joi.object({
  time: joi
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/) // ChatGPT HH:MM
    .required(),
  location: joi.string().required(),
  description: joi.string().required(),
  limit: joi.number().positive().required(),
  keywords: joi.array().items(joi.string()).required(),
});

/*
{
	"time": "15:30",
	"location": "Stockholm",
	"description": "Javascript är dåtiden! Kom och lär dig massa trams.",
	"limit": 30,
	"keywords": ["JavaScript", "Frontend", "TypeScript"]
}
*/
