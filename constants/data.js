export const MISSIONS = [
  { id: 'dishwasher', target: 'Kitchen Dishwasher', payout: 100, action: 'Bypass Laser', tagLocation: 'Dishwasher Door' },
  { id: 'dogbowl', target: 'Dog Bowl', payout: 50, action: 'Bypass Sensor', tagLocation: 'Food Mat' },
  { id: 'lawnmower', target: 'Lawn Mower', payout: 300, action: 'Bypass Override', tagLocation: 'Garage Handle' },
];

export const REWARDS = [
  { id: 'dinner', title: 'Dinner Date Night', subtitle: 'Real-world date voucher', cost: 1200, icon: 'silverware-fork-knife' },
  { id: 'movie', title: 'Movie Night Pick', subtitle: "Choose tonight's movie", cost: 300, icon: 'movie-open' },
  { id: 'nap', title: 'Guilt-Free Nap', subtitle: '1-hour undisturbed sleep', cost: 500, icon: 'bed' },
];

export const TIMER_OPTIONS = [
  { id: '15', minutes: '15m', label: 'Smash & Grab', payout: 75 },
  { id: '30', minutes: '30m', label: 'Standard Run', payout: 200 },
  { id: '60', minutes: '60m', label: 'Deep Vault', payout: 500 },
];