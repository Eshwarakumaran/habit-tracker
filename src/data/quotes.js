export const QUOTES = [
  'Vengeance begins with discipline.',
  'Control your fire.',
  'The stronger the spirit, the stronger the flame.',
  'Rise from the ashes.',
  'Every chain broken is a habit forged.',
  'The road never ends — ride it with purpose.',
  'Your soul burns brightest in the darkness.',
  'Discipline is the fuel of vengeance.',
  'Embrace the fire within.',
  'No mercy for weakness. No excuses.',
  'The flame that burns twice as bright burns half as long — make it count.',
  'Conquer yourself before you conquer the world.',
  'Hell hath no fury like a spirit unleashed.',
  'One habit at a time, one soul at a time.',
  'The night is darkest before the dawn — keep riding.',
];

export const getRandomQuote = () =>
  QUOTES[Math.floor(Math.random() * QUOTES.length)];
