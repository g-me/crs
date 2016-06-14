module.exports = function(Customer) {

  Customer.disableRemoteMethod('deleteById',true);

  Customer.beforeRemote('**', function(ctx, user, next) {
    console.log(ctx.methodString, 'was invoked remotely'); // customers.prototype.save was invoked remotely
    next();
  });
};
