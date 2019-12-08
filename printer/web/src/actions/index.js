import axios from 'axios';
const apiRoot = `/api/printer`;

export const upload = async (file) => {
  console.log('uploading:', file)
  const { id, signedPutUrl } = await getSignedUrl(file.name);
  return axios.put(
      signedPutUrl,
      file,
      {
        headers: {
          'Content-Type': 'multipart/formdata; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Cross-Domain': true
        }
      }
  ).then(res => {
      return notify(id).then(_ => ({ statusCode: 200, fileId: id }))
  })
};

export const getSignedUrl = (filename) => {
  return fetch(`${apiRoot}/create?filename=${filename}`).then(_ => _.json())
};

export const notify = (fileId) => {
  console.log('sending notification for', fileId)
  return fetch(`${apiRoot}/notify.json`, {
    method: 'POST',
    body: JSON.stringify({
        text: `Job created with id ${fileId}.`
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
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
    catch(err) {};
  }
};
