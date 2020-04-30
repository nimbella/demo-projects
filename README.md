## Overview

### The demo-projects repository

This repository contains Nimbella [projects](https://apigcp.nimbella.io/downloads/nim/nim.html#overview-of-nimbella-projects-actions-and-deployment).  Some of the `README` documents serve as tutorials
for using the Nimbella platform to build  both stateless and stateful cloud applications.  We'll use them to give you a feel for the various types of projects you can create.

The examples used in this document are available on GitHub and the Nimbella platform has integrations with GitHub to make it easy to deploy your projects from GitHub, as you'll see.

The tutorial introduction has the following parts:

- This README
- Demos with tutorial READMEs
  - **QR Code demo** – [View the GitHub project](https://github.com/nimbella/demo-projects/tree/master/qrcode)
    A stateless application with one static web page and one function. The web page has a form in which a visitor can enter text and get a corresponding QR code.
    [**View demo**](https://qrdemo-apigcp.nimbella.io/):
  - **Visits demo** – [View the GitHub  project](https://github.com/nimbella/demo-projects/tree/master/visits)
    A stateful application with one static web page and two functions. The web page displays a counter of the total number of visits to that page.
  - **Optical Character Recognition (OCR) demo** – [View the GitHub project](https://github.com/nimbella/demo-projects/tree/master/ocr)
    A serverless application using a React front end and more functions on the back end. This demo uses the [Tesseract OCR Engine](https://github.com/tesseract-ocr/tesseract) to convert text from user-uploaded images to text.
    [**View demo**](https://ocrdemo-apigcp.nimbella.io)

### Prerequisites

To understand these tutorials, the following developer skills are helpful:

- Knowledge of JavaScript
- Some knowledge of the NPM tool

To run these tutorials yourself, you'll need the following:
- A [Nimbella Cloud account](https://nimbella.com) (click the button for free signup).
- The [Nimbella Command Line Tool](https://apigcp.nimbella.io), called _nim_, installed for your platform (Windows, Mac, or Linux)

To configure your Nimbella Cloud account and install nim, see [How To Use the Nimbella Command Line Tool](https://apigcp.nimbella.io/downloads/nim/nim.html).

### How to deploy the demos

Besides the Nimbella GitHub demos used as tutorials in thie guide, there are other demos that are also available in this repository.

To deploy any demo project directly from GitHub to the Nimbella Cloud, run the following nim command in your terminal:

   `nim project deploy github:nimbella/demo-projects/<project-subdirectory>`
   
Your results may vary depending on whether you used a GitHub account to create your Nimbella account.  If you did, you will be deploying as an authenticated GitHub user and all should go smoothly.  

- If you used just an email, Nimbella will not have GitHub credentials stored for you.  Some of the larger demos may be rejected by GitHub because the deployment will exceed the rate limit for unauthenticated users
- If you used just an email but actually have a GitHub account, you can attach your github credentials at any time using `nim auth github --initial`

**Note:** If you clone the GitHub repository locally to your disk, then you can deploy from your local path by running the following nim command in your terminal:

   `nim project deploy /local/path/to/demos/<github-demo-project>`
   
This will not incur any rate limitations from GitHub since the deployment step will not involve GitHub directly.
