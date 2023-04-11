const customersService = require('../services/customersService');

const _customersService = new customersService();

exports.getTotalCustomersByTravel = async (id) => {
  return await _customersService.getCount(id);
};
