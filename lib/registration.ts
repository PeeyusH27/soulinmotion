/**
 * The registration form's single source of truth. The browser and the API route
 * both import this module, so a field can never be validated one way on the
 * client and another way on the server — add a field here and both ends follow.
 *
 * Deliberately dependency-free. A schema library would be a third of the client
 * bundle for eleven fields, and the rules below are the whole of it.
 */

/**
 * The form is one panel, but it still reads in three movements. These are the
 * headings between them — they orient without ever hiding a field behind a
 * "next" button.
 */
export const GROUPS = [
  { n: '01', title: 'You', note: 'So we know where to send the link.' },
  { n: '02', title: 'Where you are', note: 'Helps shape the room on the day.' },
  { n: '03', title: 'What you bring', note: 'Optional — but it changes the session.' },
] as const;

/** Dial codes offered in the phone field. India first; the rest are the diaspora. */
export const DIAL_CODES = [
  { code: '+91',  label: 'IN +91' },
  { code: '+1',   label: 'US +1' },
  { code: '+44',  label: 'UK +44' },
  { code: '+61',  label: 'AU +61' },
  { code: '+971', label: 'AE +971' },
  { code: '+65',  label: 'SG +65' },
  { code: '+49',  label: 'DE +49' },
  { code: '+64',  label: 'NZ +64' },
  { code: '+27',  label: 'ZA +27' },
  { code: '+60',  label: 'MY +60' },
] as const;

/**
 * Suggestions for the city field — NOT a closed list. The field is a combobox,
 * so anything typed is accepted: a hard dropdown would turn "my town is not
 * listed" into "I cannot register", and the dial codes above say plainly that
 * people join from outside these cities.
 *
 * Ordered by how likely they are rather than alphabetically, since the list is
 * filtered as you type and the top of it is what an empty field shows.
 */
export const CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata',
  'Ahmedabad', 'Gurugram', 'Noida', 'Jaipur', 'Chandigarh', 'Lucknow', 'Indore',
  'Bhopal', 'Nagpur', 'Surat', 'Vadodara', 'Kochi', 'Thiruvananthapuram',
  'Coimbatore', 'Mysuru', 'Visakhapatnam', 'Vijayawada', 'Bhubaneswar', 'Patna',
  'Ranchi', 'Guwahati', 'Dehradun', 'Shimla', 'Amritsar', 'Ludhiana',
  'Varanasi', 'Prayagraj', 'Kanpur', 'Agra', 'Meerut', 'Ghaziabad', 'Faridabad',
  'Nashik', 'Thane', 'Navi Mumbai', 'Aurangabad', 'Rajkot', 'Jodhpur', 'Udaipur',
  'Raipur', 'Jabalpur', 'Gwalior', 'Madurai', 'Tiruchirappalli', 'Mangaluru',
  'Hubballi', 'Goa', 'Puducherry', 'Siliguri', 'Jammu', 'Srinagar',
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Doha', 'Muscat', 'Riyadh',
  'Singapore', 'Kuala Lumpur', 'Hong Kong', 'Bangkok',
  'London', 'Manchester', 'Birmingham', 'Leicester',
  'New York', 'New Jersey', 'San Francisco', 'Seattle', 'Chicago', 'Dallas',
  'Houston', 'Atlanta', 'Toronto', 'Vancouver',
  'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Auckland',
  'Berlin', 'Frankfurt', 'Munich', 'Zurich', 'Amsterdam',
  'Johannesburg', 'Cape Town', 'Nairobi',
] as const;

/**
 * What people actually type. Half this audience learned these cities under
 * their older names, and searching "Bangalore" returning nothing — while
 * returning Bangkok and Brisbane — is the single worst miss the list can make.
 */
export const CITY_ALIASES: Record<string, readonly string[]> = {
  Bengaluru: ['bangalore', 'blr'],
  Mumbai: ['bombay'],
  Kolkata: ['calcutta'],
  Chennai: ['madras'],
  Pune: ['poona'],
  Vadodara: ['baroda'],
  Mysuru: ['mysore'],
  Gurugram: ['gurgaon'],
  Kochi: ['cochin', 'ernakulam'],
  Puducherry: ['pondicherry', 'pondy'],
  Mangaluru: ['mangalore'],
  Hubballi: ['hubli'],
  Tiruchirappalli: ['trichy'],
  Prayagraj: ['allahabad'],
  Visakhapatnam: ['vizag'],
  Varanasi: ['benares', 'kashi'],
  Thiruvananthapuram: ['trivandrum'],
  Aurangabad: ['sambhajinagar'],
  Indore: ['indaur'],
  Delhi: ['new delhi', 'ncr'],
  Noida: ['greater noida'],
  Goa: ['panaji', 'panjim'],
};

export const EXPERIENCE = [
  { value: 'new',          label: 'New to this',      note: 'Chakras and NLP are fresh ground.' },
  { value: 'some',         label: 'Some experience',  note: 'A bit of yoga, meditation or inner work.' },
  { value: 'practitioner', label: 'I practise or teach', note: 'This is already part of my life.' },
] as const;

export const HEARD_FROM = [
  'Instagram',
  'Facebook',
  'WhatsApp',
  'A friend or family',
  'YouTube',
  'Google search',
  'Somewhere else',
] as const;

export type Registration = {
  name: string;
  dial: string;
  phone: string;
  email: string;
  city: string;
  experience: string;
  heardFrom: string;
  intention: string;
  consent: boolean;
  /** bot trap — a real person never fills this, it is hidden from everyone else */
  website: string;
};

export const EMPTY: Registration = {
  name: '',
  dial: '+91',
  phone: '',
  email: '',
  city: '',
  experience: '',
  heardFrom: '',
  intention: '',
  consent: true,
  website: '',
};

export type Errors = Partial<Record<keyof Registration, string>>;

/** which fields sit under which heading */
export const GROUP_FIELDS: Array<Array<keyof Registration>> = [
  ['name', 'email', 'phone'],
  ['city', 'experience', 'heardFrom'],
  ['intention', 'consent'],
];

/**
 * The fields someone must actually fill. The petal meter measures against this
 * rather than against every field, so the optional textarea never makes a
 * completed form look unfinished.
 */
export const REQUIRED: Array<keyof Registration> = [
  'name', 'email', 'phone', 'city', 'experience', 'heardFrom',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

export const MAX = { name: 80, email: 160, phone: 20, city: 80, intention: 600 };

export function digits(value: string) {
  return value.replace(/\D+/g, '');
}

/**
 * Validates the whole record and returns one message per bad field. Callers
 * decide which of those messages to *show* — the form only surfaces errors for
 * the step you are on, the API route rejects on any of them.
 */
export function validate(v: Registration): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const phone = digits(v.phone);
  const city = v.city.trim();

  if (name.length < 2) e.name = 'Please tell us your name.';
  else if (name.length > MAX.name) e.name = 'That is longer than we can store.';

  if (!email) e.email = 'We need an email to send the Zoom link.';
  else if (!EMAIL_RE.test(email)) e.email = 'That does not look like an email address.';
  else if (email.length > MAX.email) e.email = 'That is longer than we can store.';

  if (!phone) e.phone = 'A number, so we can share the WhatsApp link.';
  else if (phone.length < 6 || phone.length > 15) e.phone = 'That number looks incomplete.';

  if (!DIAL_CODES.some((d) => d.code === v.dial)) e.dial = 'Pick a country code.';

  if (!city) e.city = 'Which city are you joining from?';
  else if (city.length > MAX.city) e.city = 'That is longer than we can store.';

  if (!EXPERIENCE.some((x) => x.value === v.experience)) e.experience = 'Pick whichever is closest.';

  if (!HEARD_FROM.includes(v.heardFrom as (typeof HEARD_FROM)[number])) {
    e.heardFrom = 'Pick one so we know where to keep showing up.';
  }

  if (v.intention.trim().length > MAX.intention) e.intention = 'Please keep this under 600 characters.';

  return e;
}

/** 0 → 1, how much of the form is done. Drives the petal meter and its hue. */
export function progressOf(v: Registration): number {
  const errs = validate(v);
  const done = REQUIRED.filter((f) => !errs[f]).length;
  return done / REQUIRED.length;
}

/** the shape written to storage — trimmed, normalised, ready for a spreadsheet row */
export function normalise(v: Registration) {
  return {
    name: v.name.trim().replace(/\s+/g, ' '),
    email: v.email.trim().toLowerCase(),
    phone: `${v.dial} ${digits(v.phone)}`,
    city: v.city.trim(),
    experience: v.experience,
    heard_from: v.heardFrom,
    intention: v.intention.trim(),
    consent: Boolean(v.consent),
  };
}
