A serverless single page app with a counter for the number of page visits.

This project is organized into a `web` front-end with a single HTML
file that allows someone visiting the page to see how many times the
page has been visited since the project was deployed. The backend
is implemented in PHP.

### Prerequisites

The project is intended for the Nimbella Cloud. Projects are deployed
using the Nimbella command line tool called `nim`. You can install
it from [nimbella.io](https://nimbella.io) if you don't have it already installed.
Once downloaded, use `nim auth login <token>` to login to the desired
cloud namespace which will host this project once deployed.

### Deploy Project

Run `nim project deploy .` to deploy the project then visit the shown
link to see your project running in the cloud.
