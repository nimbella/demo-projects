import axios from 'axios';
const apiRoot = '/api/ocr';

const getSignedUrl = (filename) => {
  return fetch(`${apiRoot}/credential?filename=${filename}`).then(_ => _.json())
};

export const imageToText = (file, lang, id) => {
  const data = {
    url: file,
    lang,
    id
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiRoot}/imageToText`, options).then(handleResponse)
};

export const progress = (id) => {
  return fetch(`${apiRoot}/progress?id=${id}`).then(handleResponse);
};

export const upload = async (file) => {
  // console.log('uploading:', file);
  const { signedPutUrl, signedGetUrl } = await getSignedUrl(file.name);

  const options = {
    headers: {
      'Content-Type': 'multipart/formdata; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Cross-Domain': true
    }
  };

  return axios.put(
      signedPutUrl,
      file,
      options
  ).then(res => {
      const statusCode = res.status;
      if(statusCode === 200) {
        return { statusCode, imageUrl: signedGetUrl }
      } else {
        return { statusCode }
      }
  })
};

export const createSpeakURL = (data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiRoot}/textToSpeech`, options).then(handleResponse)
};

const handleResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    try{
      let error = new Error(res.statusText);
      error['response'] = res;
      return error;
    }
    catch(err) {}
  }
};
