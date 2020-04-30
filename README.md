## Overview

### Welcome to the Nimbella Cloud platform

Blurb about Nimbella platform... (integrated CDN for static web assets, functions, and state)

### Organization of this document

The purpose of this document is to show you by example how to create a Nimbella project and use the main platform features to build  both stateless and stateful cloud applications. We'll use a set of tutorials to give you a feel for the various types of projects you can create.

The examples used in this document are available on GitHub in these tutorials and the Nimbella platform has integrations with GitHub to make it easy to deploy your projects from GitHub, as you'll see.

This document has the following sections:

- This overivew
- Set up your Nimbella project repo in GitHub
  If you don't want to use GitHub...
- Tutorials
  - **QR Code demo** – [View the GitHub project](https://github.com/nimbella/demo-projects/tree/master/qrcode)
    A stateless application with one static web page and one function. The web page has a form in which a visitor can enter text and get a corresponding QR code.
    [**View result**](https://qrdemo-apigcp.nimbella.io/?text=somewhere+over+the+rainbow):
  - **Visits demo** – [View the GitHub  project](https://github.com/nimbella/demo-projects/tree/master/visits)
    A stateful application with one static web page and two functions. The web page displays a counter of the total number of visits to that page.
    [**View result**](LINK)
  - **Optical Character Recognition (OCR) demo** – [**View the GitHub project**](https://github.com/nimbella/demo-projects/tree/master/ocr)
    A serverless application using a React front end and more functions on the back end. This demo uses the [Tesseract OCR Engine](https://github.com/tesseract-ocr/tesseract) to convert text from user-uploaded images to text.
    [**View result**](https://ocrdemo-apigcp.nimbella.io)

### Prerequisites

To understand these tutorials, the following developer skills are helpful:
- Knowledge of JavaScript.
- xxx

To run these tutorials yourself, you'll need the following:
- A Nimbella Cloud account, set up with a namespace.
- The Nimbella Command Line Tool(LINK), called _nim_, installed on Windows or Mac.

To configure your Nimbella Cloud account and install nim, see [How To Use the Nimbella Command Line Tool](LINK).

### How to run the GitHub demos

Besides the Nimbella GitHub demos used as tutorials in thie guide, there are other demos that are also available at the [nimbella/demo-projects repository](https://github.com/nimbella/demo-projects) on  GitHub.

To deploy any demo project directly from GitHub to the Nimbella Cloud, run the following nim command in your terminal:

   `nim project deploy /path/to/<github-demo-project>`

**Note:** If you clone the GitHub repository locally to your disk, then you can deploy from your local path by running the following nim command in your terminal:

   `nim project deploy /local/path/to/demos/<github-demo-project>`
