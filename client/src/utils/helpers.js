// base link from vite.config.js
export const baseLink = '/Super_Pirates-Meetup';

export const siteLinks = [
  { title: 'Home', url: `${baseLink}/` },
  { title: 'Meetups', url: `${baseLink}/meetups` },
  { title: 'Sign Up', url: `${baseLink}/signup` },
  { title: 'Log In', url: `${baseLink}/login` },
];

export function generateHashtag(str) {
  const hashtag = str.split(' ').reduce((tag, word) => {
    if (word.length > 0) {
      return tag + word[0].toUpperCase() + word.slice(1);
    } else {
      return tag;
    }
  }, '#');

  return hashtag.length === 1 ? false : hashtag;
}
