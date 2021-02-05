export const API_ROOT_URL = "/api/ge2020";
// export const API_ROOT_URL = 'https://devchand-hfo8lwtg1e5-apigcp.nimbella.io/api/ge2020';

export const LOCALE_SHORTHANDS = {
  english: "en-US",
};

export const STATISTIC_DEFINITIONS = {
  republican: {
    displayName: "republican",
    color: "#ff073a",
    format: "int",
    options: { key: "republican" },
  },
  democrat: {
    displayName: "democrat",
    color: "#007bff",
    format: "int",
    options: { key: "democrat" },
    hideDelta: true,
  },
  libertarian: {
    displayName: "libertarian",
    color: "#6c757d",
    format: "int",
    options: { key: "libertarian" },
  },
  green: {
    displayName: "green",
    color: "#28a745",
    format: "int",
    options: { key: "green" },
  },
  constitution: {
    displayName: "constitution",
    color: "#4b1eaa",
    format: "int",
    options: { key: "constitution party" },
  },
  other: {
    displayName: "others",
    format: "int",
    options: { key: "others" },
  },
  total: {
    displayName: "total",
    format: "short",
    options: { key: "total" },
    hideDelta: true,
  },
};

const definitions = Object.keys(STATISTIC_DEFINITIONS).reduce(
  (acc, statistic) => {
    const { options, ...config } = STATISTIC_DEFINITIONS[statistic];
    acc.options[statistic] = options;
    acc.configs[statistic] = config;
    return acc;
  },
  { options: {}, configs: {} }
);

export const STATISTIC_CONFIGS = definitions.configs;
export const STATISTIC_OPTIONS = definitions.options;

export const PER_MILLION_OPTIONS = {
  normalizeByKey: "total",
  multiplyFactor: 1e6,
};

export const NAN_STATISTICS = ["constitution", "total"];

export const PRIMARY_STATISTICS = [
  "republican",
  "democrat",
  "libertarian",
  "green",
];

export const TABLE_STATISTICS = [...PRIMARY_STATISTICS];

export const TABLE_STATISTICS_EXPANDED = Object.keys(STATISTIC_DEFINITIONS);

export const TIMESERIES_STATISTICS = [...PRIMARY_STATISTICS];

export const UPDATES_COUNT = 10;

export const COUNTY_TABLE_COUNT = 30;

export const D3_TRANSITION_DURATION = 300;

export const MINIGRAPH_LOOKBACK_DAYS = 10;

export const TESTED_LOOKBACK_DAYS = 7;

export const UNASSIGNED_STATE_CODE = "UN";

export const UNKNOWN_COUNTY_KEY = "Unknown";

export const ISO_DATE_REGEX = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g;

export const INDIA_ISO_SUFFIX = "T00:00:00+05:30";

export const SPRING_CONFIG_NUMBERS = { clamp: true, precision: 1 };

export const TIMESERIES_CHART_TYPES = {
  total: "Cumulative",
  delta: "Separate",
};

export const TIMESERIES_LOOKBACKS = {
  BEGINNING: "Beginning",
  NINETY: "1990",
  TWOK: "2000",
};

export const MAP_VIZS = {
  CHOROPLETH: 0,
  BUBBLES: 1,
};

export const MAP_VIEWS = {
  STATES: 0,
  COUNTIES: 1,
};

export const MAP_TYPES = {
  COUNTRY: 0,
  STATE: 1,
};

export const MAPS_DIR =
  process.env.NODE_ENV === "production" ? "/mini_maps" : "/projected_maps";

export const MAP_META = {
  AL: {
    geoDataFile: `${MAPS_DIR}/alabama.json`,
    mapType: MAP_TYPES.STATE,
  },
  AK: {
    geoDataFile: `${MAPS_DIR}/alaska.json`,
    mapType: MAP_TYPES.STATE,
  },
  AS: {
    geoDataFile: `${MAPS_DIR}/americansamoa.json`,
    mapType: MAP_TYPES.STATE,
  },
  AZ: {
    geoDataFile: `${MAPS_DIR}/arizona.json`,
    mapType: MAP_TYPES.STATE,
  },
  CA: {
    geoDataFile: `${MAPS_DIR}/california.json`,
    mapType: MAP_TYPES.STATE,
  },
  CO: {
    geoDataFile: `${MAPS_DIR}/colorado.json`,
    mapType: MAP_TYPES.STATE,
  },
  CT: {
    geoDataFile: `${MAPS_DIR}/connecticut.json`,
    mapType: MAP_TYPES.STATE,
  },
  DE: {
    geoDataFile: `${MAPS_DIR}/delaware.json`,
    mapType: MAP_TYPES.STATE,
  },
  DC: {
    geoDataFile: `${MAPS_DIR}/districtofcolumbia.json`,
    mapType: MAP_TYPES.STATE,
  },
  FM: {
    geoDataFile: `${MAPS_DIR}/federatedstatesofmicronesia.json`,
    mapType: MAP_TYPES.STATE,
  },
  FL: {
    geoDataFile: `${MAPS_DIR}/florida.json`,
    mapType: MAP_TYPES.STATE,
  },
  GA: {
    geoDataFile: `${MAPS_DIR}/georgia.json`,
    mapType: MAP_TYPES.STATE,
  },
  GU: {
    geoDataFile: `${MAPS_DIR}/guam.json`,
    mapType: MAP_TYPES.STATE,
  },
  HI: {
    geoDataFile: `${MAPS_DIR}/hawaii.json`,
    mapType: MAP_TYPES.STATE,
  },
  ID: {
    geoDataFile: `${MAPS_DIR}/idaho.json`,
    mapType: MAP_TYPES.STATE,
  },
  IL: {
    geoDataFile: `${MAPS_DIR}/illinois.json`,
    mapType: MAP_TYPES.STATE,
  },
  IN: {
    geoDataFile: `${MAPS_DIR}/indiana.json`,
    mapType: MAP_TYPES.STATE,
  },
  IA: {
    geoDataFile: `${MAPS_DIR}/iowa.json`,
    mapType: MAP_TYPES.STATE,
  },
  KS: {
    geoDataFile: `${MAPS_DIR}/kansas.json`,
    mapType: MAP_TYPES.STATE,
  },
  KY: {
    geoDataFile: `${MAPS_DIR}/kentucky.json`,
    mapType: MAP_TYPES.STATE,
  },
  LA: {
    geoDataFile: `${MAPS_DIR}/louisiana.json`,
    mapType: MAP_TYPES.STATE,
  },
  ME: {
    geoDataFile: `${MAPS_DIR}/maine.json`,
    mapType: MAP_TYPES.STATE,
  },
  MH: {
    geoDataFile: `${MAPS_DIR}/marshallislands.json`,
    mapType: MAP_TYPES.STATE,
  },
  MD: {
    geoDataFile: `${MAPS_DIR}/maryland.json`,
    mapType: MAP_TYPES.STATE,
  },
  MA: {
    geoDataFile: `${MAPS_DIR}/massachusetts.json`,
    mapType: MAP_TYPES.STATE,
  },
  TR: {
    geoDataFile: `${MAPS_DIR}/tripura.json`,
    mapType: MAP_TYPES.STATE,
  },
  MN: {
    geoDataFile: `${MAPS_DIR}/minnesota.json`,
    mapType: MAP_TYPES.STATE,
  },
  MS: {
    geoDataFile: `${MAPS_DIR}/mississippi.json`,
    mapType: MAP_TYPES.STATE,
  },
  MO: {
    geoDataFile: `${MAPS_DIR}/missouri.json`,
    mapType: MAP_TYPES.STATE,
  },
  MT: {
    geoDataFile: `${MAPS_DIR}/montana.json`,
    mapType: MAP_TYPES.STATE,
  },
  NE: {
    geoDataFile: `${MAPS_DIR}/nebraska.json`,
    mapType: MAP_TYPES.STATE,
  },
  NV: {
    geoDataFile: `${MAPS_DIR}/nevada.json`,
    mapType: MAP_TYPES.STATE,
  },
  NH: {
    geoDataFile: `${MAPS_DIR}/newhampshire.json`,
    mapType: MAP_TYPES.STATE,
  },
  NJ: {
    geoDataFile: `${MAPS_DIR}/newjersey.json`,
    mapType: MAP_TYPES.STATE,
  },
  NM: {
    geoDataFile: `${MAPS_DIR}/newmexico.json`,
    mapType: MAP_TYPES.STATE,
  },
  NY: {
    geoDataFile: `${MAPS_DIR}/newyork.json`,
    mapType: MAP_TYPES.STATE,
  },
  NC: {
    geoDataFile: `${MAPS_DIR}/northcarolina.json`,
    mapType: MAP_TYPES.STATE,
  },
  ND: {
    geoDataFile: `${MAPS_DIR}/northdakota.json`,
    mapType: MAP_TYPES.STATE,
  },
  MP: {
    geoDataFile: `${MAPS_DIR}/northernmarianaislands.json`,
    mapType: MAP_TYPES.STATE,
  },
  OH: {
    geoDataFile: `${MAPS_DIR}/ohio.json`,
    mapType: MAP_TYPES.STATE,
  },
  OK: {
    geoDataFile: `${MAPS_DIR}/oklahoma.json`,
    mapType: MAP_TYPES.STATE,
  },
  OR: {
    geoDataFile: `${MAPS_DIR}/oregon.json`,
    mapType: MAP_TYPES.STATE,
  },
  PW: {
    geoDataFile: `${MAPS_DIR}/palau.json`,
    mapType: MAP_TYPES.STATE,
  },
  PA: {
    geoDataFile: `${MAPS_DIR}/pennsylvania.json`,
    mapType: MAP_TYPES.STATE,
  },
  PR: {
    geoDataFile: `${MAPS_DIR}/puertorico.json`,
    mapType: MAP_TYPES.STATE,
  },
  RI: {
    geoDataFile: `${MAPS_DIR}/rhodeisland.json`,
    mapType: MAP_TYPES.STATE,
  },
  SC: {
    geoDataFile: `${MAPS_DIR}/southcarolina.json`,
    mapType: MAP_TYPES.STATE,
  },
  SD: {
    geoDataFile: `${MAPS_DIR}/southdakota.json`,
    mapType: MAP_TYPES.STATE,
  },
  TN: {
    geoDataFile: `${MAPS_DIR}/tennessee.json`,
    mapType: MAP_TYPES.STATE,
  },
  TX: {
    geoDataFile: `${MAPS_DIR}/texas.json`,
    mapType: MAP_TYPES.STATE,
  },
  UT: {
    geoDataFile: `${MAPS_DIR}/utah.json`,
    mapType: MAP_TYPES.STATE,
  },
  VT: {
    geoDataFile: `${MAPS_DIR}/vermont.json`,
    mapType: MAP_TYPES.STATE,
  },
  VI: {
    geoDataFile: `${MAPS_DIR}/virginislands.json`,
    mapType: MAP_TYPES.STATE,
  },
  VA: {
    geoDataFile: `${MAPS_DIR}/virginia.json`,
    mapType: MAP_TYPES.STATE,
  },
  WA: {
    geoDataFile: `${MAPS_DIR}/washington.json`,
    mapType: MAP_TYPES.STATE,
  },
  WV: {
    geoDataFile: `${MAPS_DIR}/westvirginia.json`,
    mapType: MAP_TYPES.STATE,
  },
  WI: {
    geoDataFile: `${MAPS_DIR}/wisconsin.json`,
    mapType: MAP_TYPES.STATE,
  },
  WY: {
    geoDataFile: `${MAPS_DIR}/wyoming.json`,
    mapType: MAP_TYPES.STATE,
  },
  TT: {
    geoDataFile: `${MAPS_DIR}/india.json`,
    mapType: MAP_TYPES.COUNTRY,
  },
};

export const MAP_LEGEND_HEIGHT = 50;

export const STATE_NAMES = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  TT: "USA",
  [UNASSIGNED_STATE_CODE]: "Unassigned",
};

const stateCodes = [];
const stateCodesMap = {};
Object.keys(STATE_NAMES).map((key, index) => {
  stateCodesMap[STATE_NAMES[key]] = key;
  stateCodes.push({ code: key, name: STATE_NAMES[key] });
  return null;
});
export const STATE_CODES = stateCodesMap;
export const STATE_CODES_ARRAY = stateCodes;
