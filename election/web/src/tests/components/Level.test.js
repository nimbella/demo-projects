import Level from '../../components/Level';

import {render} from '@testing-library/react';
import React from 'react';

const data = {
  delta: {
    republican: 153,
    libertarian: 1,
    green: 2,
    constitution: {
      samples: 2544,
    },
  },
  meta: {
    constitution: {
      last_updated: '2020-09-06',
      source: 'https://docs.cdn.yougov.com/8nwf5tw7g2/econTabReport.pdf',
    },
  },
  total: {
    republican: 883,
    libertarian: 3,
    other: 3,
    green: 5,
    constitution: 27688,
  },
};

test('Level renders total state data', () => {
  const {container} = render(<Level {...{data}} />);

  expect(container).toHaveTextContent(
    'Republican+153883Democrat 872Green+25Libertarian+13'
  );
});
