## Numbers to Words

This project creates an API implemented in PHP and which requires installing a third party library.

### Project file structure

The GitHub project has the file structure that Nimbella uses to deploy the project with minimal configuration.
- There is a single API implemented in [./packages/default/n2w](./packages/default/n2w).
- The required library is specified in [./packages/default/n2w/composer.json](./packages/default/n2w/composer.json).
- There is a [`build.sh`](./packages/default/n2w/build.sh) to install the required library during a Nimbella project deployment.

### Deploy this project to the Nimbella Cloud

If you have the [Nimbella command line tool called `nim`](https://docs.nimbella.com/cli) installed, you can deploy this project directly from GitHub. Or, you can clone this repository and deploy from the clone.

- To deploy from GitHub

  `nim project deploy github:nimbella/demo-projects/numbers-to-words`

- If you have cloned the repository

  `nim project deploy /path/to/numbers-to-words`

The output of this command will include a link to where the application is running in the cloud for your account.
