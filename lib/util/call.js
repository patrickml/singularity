import { Meteor } from 'meteor/meteor';

/**
 * Wraps Meteor.Call in a promise
 * @param  {String} methodName the name of the method to call
 * @param  {Array} ...args     the arguments to be passed
 * @return {Promise}
 */
export const call = (methodName, ...args) =>
  new Promise((resolve, reject) => {
    Meteor.apply(methodName, [...args], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
