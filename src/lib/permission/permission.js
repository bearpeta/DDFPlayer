import {
  checkMultiple,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

class Response {
  denied = [];
  blocked = [];
  granted = [];
}

const requestPermissions = async permissions => {
  const resp = new Response();
  var requests = {};
  try {
    requests = await requestMultiple(permissions);
  } catch (e) {
    return new Promise.reject(e);
  }

  for (var [permission, result] of Object.entries(requests)) {
    switch (result) {
      case RESULTS.UNAVAILABLE || RESULTS.BLOCKED:
        resp.blocked.push(permission);
        console.log(
          `This requested feature ${permission} is not available (on this device / in this context)`,
        );
        break;
      case RESULTS.DENIED:
        resp.denied.push(permission);
        console.log(`The requested ${permission} permission has been denied`);
        break;
      case RESULTS.GRANTED:
        resp.granted.push(permission);
        console.log(`The requested ${permission} permission is granted`);
        break;
      default:
        resp.blocked.push(permission);
        break;
    }
  }
  return resp;
};

const checkPermissions = async permissions => {
  const resp = new Response();

  var statuses = {};
  try {
    statuses = await checkMultiple(permissions);
  } catch (e) {
    console.log(e);
    return new Promise.reject(e);
  }

  for (var [permission, result] of Object.entries(statuses)) {
    switch (result) {
      case RESULTS.UNAVAILABLE || RESULTS.BLOCKED:
        resp.blocked.push(permission);
        console.log(
          `This feature ${permission} is not available (on this device / in this context)`,
        );
        break;
      case RESULTS.DENIED:
        resp.denied.push(permission);
        console.log(
          `The ${permission} permission has not been requested / is denied but requestable`,
        );
        break;
      case RESULTS.GRANTED:
        resp.granted.push(permission);
        console.log(`The ${permission} permission is granted`);
        break;
    }
  }
  return resp;
};

export {checkPermissions, requestPermissions};
