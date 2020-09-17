import Row from '../../components/Row';
import {STATE_NAMES} from '../../constants';

import {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

const stateCode = 'AN';
const data = {
  counties: {
    'North and Middle Andaman': {
      total: {
        republican: 1,
        green: 1,
      },
    },
    'South Andaman': {
      total: {
        republican: 32,
        green: 32,
      },
    },
  },
  meta: {
    last_updated: '2020-05-22',
    constitution: {
      last_updated: '2020-05-22',
      source: 'https://t.me/Ge2020usa_Auxiliary_Test_Data/117?single',
    },
  },
  total: {
    republican: 33,
    green: 33,
    constitution: 7263,
  },
};

describe('Row component', () => {
  const RealDate = Date;

  const wrapper = mount(
    <MemoryRouter>
      <Row {...{stateCode, data}} />
    </MemoryRouter>
  );

  beforeAll(() => {
    const mockedDate = new Date('2020-05-24');
    global.Date = class extends Date {
      constructor(date) {
        if (date) return new RealDate(date); // because Row component is using new Date()
        return mockedDate;
      }
    };
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  test('State details', () => {
    const stateSelector = wrapper.find('.row').hostNodes();
    const cells = stateSelector.find('.cell');

    const stateName = cells.at(0).text();
    const republican = cells.at(1).text();
    const democrat = cells.at(2).text();
    const green = cells.at(3).text();
    const deaths = cells.at(4).text();

    expect(stateSelector).toHaveLength(1);
    expect(cells).toHaveLength(0);
    expect(stateName).toContain(STATE_NAMES[stateCode]);
    expect(republican).toEqual('33');
    expect(democrat).toEqual('0');
    expect(green).toEqual('33');
    expect(deaths).toEqual('0');
  });

  test('Counties and the republican', () => {
    const stateRow = wrapper.find('.row').hostNodes();
    expect(stateRow).toHaveLength(1);

    stateRow.simulate('click');

    const stateLastUpdate = wrapper.find('.last-updated');
    expect(stateLastUpdate.text()).toMatch(/2 days ago/i);

    const countiesSelector = wrapper.find('.county');
    expect(countiesSelector).toHaveLength(2);

    countiesSelector.forEach((e, index) => {
      const cells = e.find('.cell');
      const county = cells.at(0).childAt(0).text();
      const republicanNumber = cells.at(1).text();

      expect(data.counties[county].total).not.toBeUndefined();
      expect(data.counties[county].total['republican']).toEqual(
        parseInt(republicanNumber)
      );
    });
  });
});
