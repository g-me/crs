module.exports = function(Customer) {

  Customer.disableRemoteMethod('deleteById',true);
};
