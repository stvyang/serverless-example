require('app-module-path').addPath(process.cwd());

const _ = require('lodash');
const Bluebird = require('bluebird');

const httpHelper = require('src/helpers/http');
const User = require('src/models/User');

exports.helloWorld = (event, context, callback) => {
  httpHelper.createSuccessCallback(`Hello ${_.get(event.queryStringParameters, 'name', 'World')}!`, callback)
};

exports.createUser = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const body = JSON.parse(event.body);
      const user = await User.create(body);
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.readUsers = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const users = await User.findAll();
      return httpHelper.createSuccessCallback(users, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.readUserById = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const id = event.pathParameters.id;
      const user = await User.findOne({
        where: { id }
      });
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.updateUser = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const id = event.pathParameters.id;
      const body = JSON.parse(event.body);
      const user = await User.update(body,
        { where: { id } }
      );
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.deleteUser = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const id = event.pathParameters.id;
      const user = await User.destroy({
        where: { id }
      });
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}
