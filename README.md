## Overview

### The demo-projects repository

This repository contains Nimbella [projects](https://apigcp.nimbella.io/downloads/nim/nim.html#overview-of-nimbella-projects-actions-and-deployment).  Some of the `README` documents serve as tutorials for using the Nimbella platform to build  both stateless and stateful cloud applications.  We'll use them to give you a feel for the various types of projects you can create.

The examples used in this document are available on GitHub and the Nimbella platform has integrations with GitHub to make it easy to deploy your projects from GitHub, as you'll see.

The tutorial introduction has the following parts:

- Demos with tutorial:
  - **[QR Code Generator](/qrcode) –**
  A stateless application with one static web page and one function. The web page has a form in which a visitor can enter text and get a corresponding QR code. [Try it live here.](https://qrdemo-apigcp.nimbella.io/)

  - **[Page Visits Counter](/visits) -**
    A stateful application with one static web page and two functions. The web page displays a counter of the total number of unique visits to that page.

  - **[Optical Character Recognition (OCR)](/ocr) -**
    A serverless application using a React front end and stateful functions on the back end. This demo uses the [Tesseract OCR Engine](https://github.com/tesseract-ocr/tesseract) to convert text from user-uploaded images to text. It uses integrated Nimbella storage service for managing file uploads and recording function progress. [Try it live here.](https://ocrdemo-apigcp.nimbella.io)

  - **[Election 2020](/election) -**
    A serverless application using a React front end and functions on the back end. This project also is a repository of public APIs and Nimbella APIs and functions to get election news, polling places, early vote locations, contest data, exit polls data, county wise historical voting data, election officials, and government representatives for U.S. residential addresses which can be used for developing any election app. [Try it live here.](https://electiondemo-apigcp.nimbella.io/)

  - **[Stock Trading](/trade) -**
    A serverless application using a React front end and stateful functions on the back end. This demo simulates stock trading process and uses Redis to store user data. [Try it live here.](https://tradedemo-apigcp.nimbella.io/)

  - **[Chatroom](/chat) -**
    A serverless application using a React front end and stateful functions on the back end. This demo uses Redis to store and fetch user lists and messages. [Try it live here.](https://chatdemo-apigcp.nimbella.io/)

  - **[Calculator](/calculator) -**
    A stateful application with one static web page and one function. The web page has a input field in which a visitor can enter a numeric expression and output a result. [Try it live here.](https://calcdemo-apigcp.nimbella.io/)

### Prerequisites

To understand these tutorials, the following developer skills are helpful:

- Familiarity with JavaScript, Node.js or PHP
- Some knowledge of the `npm` tool

To run these tutorials yourself, you'll need the following:
- A [Nimbella Cloud account](https://nimbella.com/request). It's free to signup and get started.
- The [Nimbella Command Line Tool](https://apigcp.nimbella.io/downloads/nim/nim.html), called `nim`, installed for your platform (Windows, Mac, or Linux).

To configure your Nimbella Cloud account and install `nim`, see [How To Use the Nimbella Command Line Tool](https://apigcp.nimbella.io/downloads/nim/nim.html).

### How to deploy the demos

Besides the Nimbella GitHub demos used as tutorials in this guide, there are other demos that are also available in this repository.

To deploy any demo project directly from GitHub to the Nimbella Cloud, run the following nim command in your terminal:
```
nim project deploy github:nimbella/demo-projects/<demo-subdirectory>
```

Your results may vary depending on whether you used a GitHub account to create your Nimbella account. If you did, you will be deploying as an authenticated GitHub user and all should go smoothly.

- If you used just an email, Nimbella will not have GitHub credentials stored for you. Some of the larger demos may be rejected by GitHub because the deployment will exceed the rate limit for unauthenticated users.

- If you used just an email but actually have a GitHub account, you can attach your github credentials at any time using `nim auth github --initial`.

**Note:** If you clone the GitHub repository locally to your disk, then you can deploy from your local path by running the following nim command in your terminal:
```
nim project deploy /local/path/to/demos/<demo-subdirectory>
```

This will not incur any rate limitations from GitHub since the deployment step will not involve GitHub directly.
