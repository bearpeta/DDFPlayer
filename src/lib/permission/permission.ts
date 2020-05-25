import {
  checkMultiple,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import {Permission} from 'react-native';

interface Resp {
  denied: Permission[];
  blocked: Permission[];
  granted: Permission[];
}
class Response implements Resp {
  denied: Permission[] = [];
  blocked: Permission[] = [];
  granted: Permission[] = [];
}

const requestPermissions = async (permissions: Permission[]) => {
  const resp = new Response();
  let requests;
  try {
    requests = await requestMultiple(permissions);
  } catch (e) {
    return Promise.reject(e);
  }

  for (let [permission, result] of Object.entries(requests)) {
    switch (result) {
      case RESULTS.UNAVAILABLE || RESULTS.BLOCKED:
        resp.blocked.push(permission as Permission);
        break;
      case RESULTS.DENIED:
        resp.denied.push(permission as Permission);
        console.log(`The requested ${permission} permission has been denied`);
        break;
      case RESULTS.GRANTED:
        resp.granted.push(permission as Permission);
        console.log(`The requested ${permission} permission is granted`);
        break;
      default:
        resp.blocked.push(permission as Permission);
        break;
    }
  }
  return resp;
};

const checkPermissions = async (permissions: Permission[]) => {
  const resp = new Response();

  var statuses = {};
  try {
    statuses = await checkMultiple(permissions);
  } catch (e) {
    return Promise.reject(e);
  }

  for (var [permission, result] of Object.entries(statuses)) {
    switch (result) {
      case RESULTS.UNAVAILABLE || RESULTS.BLOCKED:
        resp.blocked.push(permission as Permission);
        console.log(
          `This feature ${permission} is not available (on this device / in this context)`,
        );
        break;
      case RESULTS.DENIED:
        resp.denied.push(permission as Permission);
        console.log(
          `The ${permission} permission has not been requested / is denied but requestable`,
        );
        break;
      case RESULTS.GRANTED:
        resp.granted.push(permission as Permission);
        console.log(`The ${permission} permission is granted`);
        break;
    }
  }
  return resp;
};

export {checkPermissions, requestPermissions};
