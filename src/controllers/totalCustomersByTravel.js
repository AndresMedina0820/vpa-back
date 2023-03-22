const customersService = require('../services/customersService');

const _customersService = new customersService();

exports.getTotalCustomersByTravel = async (request, response) => {
  const { id } = request.params;
  const countCustomers = await _customersService.getCount(id);
  console.log('getTotalCustomersByTravel', countCustomers);
  response.status(201).json({ total: countCustomers });
};
