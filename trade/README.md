## Nimbella Trading Demo ##

This demo allows a user to buy and sell stock (virtually), shows updated stock positions and also displays information about a given stock.

The front-end is written in React.

The back-end is a set of serverless functions written in JavaScript.

The back-end functions connect to the IEX Cloud to obtain live stock information. The IEX Cloud requires an API token to get stock information. An IEX Cloud API token is available for free by:

1. Visit https://iexcloud.io
2. Click 'Get started'
3. Enter an email address and password
4. Select the '$0/Start' option
5. Verify your email address by click on the link in the email sent to you
6. Click 'API tokens' in the IEX web interface that comes up
7. In the interface, you see see your secret API token

Place the API token for the IEX Cloud into the environment as environment variable `IEXCLOUD_API_TOKEN` when using the Nimbella deployer to deploy this project.  One way to do this is to use a `.env` file as described in the Nimbella deployer documentation.

The functions use the Nimbella Redis key-value store to manage persisted data. The Nimbella API host is set at build time via REACT_APP_NIMBELLA_PROJECT_ROOT.

A Swagger API definition for the back-end functions is contained in the swagger .yaml file

## License ##

Copyright 2019 Nimbella Corp

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
