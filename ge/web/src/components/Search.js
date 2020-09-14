import {
  STATE_CODES_ARRAY,
  STATE_CODES,
  STATE_NAMES,
  UNASSIGNED_STATE_CODE,
  UNKNOWN_COUNTY_KEY,
} from '../constants';

import produce from 'immer';
import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import * as Icon from 'react-feather';
import {Link} from 'react-router-dom';
import {useDebounce, useUpdateEffect} from 'react-use';

const suggestions = [
  'Florida',
  'Louisiana',
  'Georgia',
  'Harris',
  'Washington',
  'Dallas',
];

const countySuggestions = [
  'Los Angeles',
  'Harris',
  'San Diego',
  'Dallas',
  'Bexar',
];

const stateSuggestions = [
  'Alabama',
  'Florida',
  'Georgia',
  'Washington',
  'Louisiana',
];

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [expand, setExpand] = useState(false);
  const [results, setResults] = useState([]);
  const searchInput = useRef(null);

  const [engine, setEngine] = useState(null);
  const [countyEngine, setCountyEngine] = useState(null);

  useUpdateEffect(() => {
    import('corejs-typeahead').then((Bloodhound) => {
      setEngine(
        // eslint-disable-next-line
        new Bloodhound.default({
          initialize: true,
          local: STATE_CODES_ARRAY.filter(
            ({code}) => code !== UNASSIGNED_STATE_CODE
          ),
          queryTokenizer: Bloodhound.default.tokenizers.whitespace,
          datumTokenizer: Bloodhound.default.tokenizers.obj.whitespace('name'),
        })
      );

      setCountyEngine(
        // eslint-disable-next-line
        new Bloodhound.default({
          initialize: true,
          limit: 5,
          queryTokenizer: Bloodhound.default.tokenizers.whitespace,
          datumTokenizer: Bloodhound.default.tokenizers.obj.whitespace(
            'county'
          ),
          indexRemote: true,
          remote: {
            url:
              'https://apigcp.nimbella.io/api/v1/web/raichand-8kehpaun1bf/ge2020/state_counties',
            transform: function (response) {
              const counties = [];
              Object.keys(response)
                .filter((stateName) => stateName !== 'State Unassigned')
                .map((stateName) => {
                  const countyData = response[stateName].countyData;
                  Object.keys(countyData)
                    .filter((countyName) => countyName !== UNKNOWN_COUNTY_KEY)
                    .map((countyName) => {
                      return counties.push({
                        county: countyName,
                        state: stateName,
                      });
                    });
                  return null;
                });
              return counties;
            },
          },
        })
      );
    });
  }, [expand]);

  const handleSearch = useCallback(
    (searchInput) => {
      if (!engine) return null;
      const results = [];

      const sync = (datums) => {
        datums.map((result, index) => {
          const stateObj = {
            name: result.name,
            type: 'state',
            route: result.code,
          };
          results.push(stateObj);
          return null;
        });
      };

      const countySync = (datums) => {
        datums.slice(0, 3).map((result, index) => {
          const countyObj = {
            name: result.county,
            type: 'county',
            route: STATE_CODES[result.state],
          };
          results.push(countyObj);
          return null;
        });

        setResults([...results]);
      };

      engine.search(searchInput, sync);
      countyEngine.search(searchInput, countySync);
    },
    [countyEngine, engine]
  );

  useDebounce(
    () => {
      if (searchValue) {
        handleSearch(searchValue);
      } else {
        setResults(
          produce(results, (draftResults) => {
            draftResults.splice(0);
          })
        );
      }
    },
    100,
    [searchValue]
  );

  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      'value'
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }

  const fillPlaceholder = useCallback(
    (target, index, cursorPosition, callback) => {
      if (expand) {
        target.textContent = '';
        return true;
      }
      const text = suggestions[index];
      const placeholder = target.textContent;
      target.classList.remove('disappear');
      target.textContent = placeholder + text[cursorPosition];
      if (cursorPosition < text.length - 1) {
        setTimeout(function () {
          fillPlaceholder(target, index, cursorPosition + 1, callback);
        }, 200);
        return true;
      }
      callback();
    },
    [expand]
  );

  const clearPlaceholder = useCallback((target, callback) => {
    const placeholder = target.textContent;
    target.classList.add('disappear');
    if (placeholder.length > 0) {
      setTimeout(function () {
        target.textContent = '';
        clearPlaceholder(target, callback);
      }, 1000);
      return true;
    }
    callback();
  }, []);

  const loopThroughSuggestions = useCallback(
    (target, index) => {
      if (expand) {
        target.textContent = '';
        return true;
      }

      fillPlaceholder(target, index, 0, function () {
        setTimeout(function () {
          clearPlaceholder(target, function () {
            loopThroughSuggestions(target, (index + 1) % suggestions.length);
          });
        }, 2000);
      });
    },
    [clearPlaceholder, expand, fillPlaceholder]
  );

  useEffect(() => {
    if (!expand) {
      const targetInput = document.getElementsByClassName(
        'search-placeholder'
      )[0];

      if (targetInput) {
        loopThroughSuggestions(targetInput, 0);
      }
    }
  }, [expand, loopThroughSuggestions]);

  const trail = useMemo(() => {
    const styles = [];

    [0, 0, 0].map((element, index) => {
      styles.push({
        animationDelay: `${index * 250}ms`,
      });
      return null;
    });
    return styles;
  }, []);

  const handleClose = useCallback(() => {
    setSearchValue('');
    setResults([]);
  }, []);

  const handleChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  return (
    <div className="Search">
      <label className="fadeInUp" style={trail[0]}>
        {'Search your county or state'}
      </label>
      <div className="line fadeInUp" style={trail[1]}></div>

      <div className="search-input-wrapper fadeInUp" style={trail[2]}>
        <input
          type="text"
          value={searchValue}
          ref={searchInput}
          onFocus={setExpand.bind(this, true)}
          onBlur={setExpand.bind(this, false)}
          onChange={handleChange}
        />

        {!expand && searchValue === '' && (
          <span className="search-placeholder"></span>
        )}

        <div className={`search-button`}>
          <Icon.Search />
        </div>

        {searchValue.length > 0 && (
          <div className={`close-button`} onClick={handleClose}>
            <Icon.X />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="results">
          {results.map((result, index) => (
            <Link key={index} to={`state/${result.route}`}>
              <div className="result">
                <div className="result-left">
                  <div className="result-name">
                    {`${result.name}`}
                    {result.type === 'county' &&
                      `, ${STATE_NAMES[result.route]}`}
                  </div>
                </div>
                <div className="result-type">
                  <span>{[result.route]}</span>
                  <Icon.ArrowRightCircle size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {expand && (
        <React.Fragment>
          <div className="expanded">
            <div className="expanded-left">
              <h3>{'County'}</h3>
              <div className="suggestions">
                {countySuggestions.map((suggestion, index) => (
                  <div className="suggestion" key={index}>
                    <div>-</div>
                    <h4
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setNativeValue(searchInput.current, suggestion);
                        searchInput.current.dispatchEvent(
                          new Event('input', {bubbles: true})
                        );
                      }}
                    >
                      {suggestion}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="expanded-right">
              <h3>{'State'}</h3>
              <div className="suggestions">
                {stateSuggestions.map((suggestion, index) => (
                  <div className="suggestion" key={index}>
                    <div>-</div>
                    <h4
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setNativeValue(searchInput.current, suggestion);
                        searchInput.current.dispatchEvent(
                          new Event('input', {bubbles: true})
                        );
                      }}
                    >
                      {suggestion}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

const isEqual = () => {
  return true;
};

export default React.memo(Search, isEqual);
