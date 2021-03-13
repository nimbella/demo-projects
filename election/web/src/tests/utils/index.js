import {promises as fs} from 'fs';
import {API_ROOT_URL} from '../constants';

export function removeFileExtension(fileName) {
  return fileName.substr(0, fileName.lastIndexOf('.'));
}

function removeUnknown(e) {
  return e !== 'Unknown';
}

export async function getStatesAndCountiesFromAPI() {
  const url =
    `${API_ROOT_URL}/state_counties`;
  const stateCountyWiseResponse = await (await fetch(url)).json();
  const states = Object.keys(stateCountyWiseResponse).filter(removeUnknown);
  const result = {};
  states.map((stateName) => {
    result[stateName] = Object.keys(
      stateCountyWiseResponse[stateName]['countyData']
    ).filter(removeUnknown);
  });
  return result;
}

export async function getStatesAndCountiesFromMaps() {
  const dir = await fs.opendir('public/maps');
  const counties = {};
  for await (const dirent of dir) {
    const fileName = dirent.name;
    const fileNameWithoutExtension = removeFileExtension(fileName);

    if (
      fileName === 'india.json' ||
      fileName === 'india_counties.json' ||
      fileName === 'dnh-and-dd.json'
    )
      continue;
    const data = JSON.parse(
      await fs.readFile(`public/maps/${fileName}`, 'binary')
    );

    const stateName =
      data.objects[`${fileNameWithoutExtension}_county`].geometries[0]
        .properties.st_nm;

    const result = data.objects[
      `${fileNameWithoutExtension}_county`
    ].geometries.map((e) => e.properties.county);

    counties[stateName] = result;
  }
  return counties;
}
