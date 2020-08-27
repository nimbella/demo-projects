## Chess

This app is a stateless single-page web application taken from [3D-Hartwig-chess-set](https://github.com/juliangarnier/3D-Hartwig-chess-set) repo.


### Note on project file structure

This project doesn't have any APIs so it doesn't include any `packages` folder.

 There's only static content (web) folder containing an  [`index.html`](./web/index.html) file. This file has the usual markup and logic that you'd write for standard web deployment. It includes buttons to change theme and border, to play and to navigate back.

[`index.html`](./web/index.html) file has references to a single [`styles.css`](./css/styles.css) file and two js files: 
- [`prefixfree.min.js`](./js/prefixfree.min.js)
- [`scripts.min.js`](./js/scripts.min.js)

The [`scripts.min.js`](./js/scripts.min.js) file is bundled and minified version of [`app.js`](./js/app.js) and [`libraries.js`](./js/libraries.js)
 
 

### Deploy this project to the Nimbella Cloud

If you have the [Nimbella command line tool called `nim`](https://nimbella.io/downloads/nim/nim.html#install-the-nimbella-command-line-tool-nim) installed, you can deploy this project directly from GitHub. Or, you can clone this repository and deploy it from the clone.

- To deploy from GitHub

  `nim project deploy github:nimbella/demo-projects/chess`

- If you have cloned the repository

   `nim project deploy /path/to/chess`

The output of this command will include a link to where the application is running in the cloud for your account.
