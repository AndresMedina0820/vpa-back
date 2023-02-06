const excel = require('excel4node');
const { getUnixTime } = require('date-fns');
const bookingCustomersService = require('../services/bookingCustomersService');
const companionsXCustomers = require('../services/companionsXCustomers');

const _bookingCustomersService = new bookingCustomersService();
const _companionsXCustomers = new companionsXCustomers();

getData = async (id) => {
  console.log('============= id', id);
  return await _bookingCustomersService.find(id);
};

// getData = async (id) => {
//   console.log('============= id', id);
//   let companions = [];
//   const data = await _bookingCustomersService.find(id)
//   .then((response) => {
//     const customers = response.map((item) => item.dataValues.customer.dataValues);
//     // console.log("customers: ", customers)
//     customers.forEach(async (item) => {
//       const compi = await _companionsService.find(item.id);
//       console.log("compi", compi)
//       companions.push(compi);
//     })
//   })
// };

getDataCompanions = async (customers) => {
  console.log("getDataCompanions: ", customers);
  let companions = [];
  customers.map(async (customer) => {
    companions = [...companions, await _companionsXCustomers.find(parseInt(customer.id, 10))];
  });
  console.log("companions", companions);
}

makeXLSX = (customers, response) => {
  const date = getUnixTime(new Date());
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  const textStyle  = workbook.createStyle({
    font: { color: "black", size: 12, bold: true }
  })

  worksheet.cell(1, 1).string("Fecha").style(textStyle);
  worksheet.cell(2, 1).string("Destino").style(textStyle);
  worksheet.cell(3, 1).string("Coordinador").style(textStyle);
  worksheet.cell(4, 1).string("Contacto").style(textStyle);

  worksheet.cell(1, 2).string("______").style(textStyle);
  worksheet.cell(2, 2).string("______").style(textStyle);
  worksheet.cell(3, 2).string("______").style(textStyle);
  worksheet.cell(4, 2).string("______").style(textStyle);

  worksheet.cell(1, 7).string("Conductor").style(textStyle);
  worksheet.cell(2, 7).string("Contacto").style(textStyle);
  worksheet.cell(3, 7).string("Placas").style(textStyle);
  worksheet.cell(4, 7).string("Transportadora").style(textStyle);

  worksheet.cell(1, 8).string("______").style(textStyle);
  worksheet.cell(2, 8).string("______").style(textStyle);
  worksheet.cell(3, 8).string("______").style(textStyle);
  worksheet.cell(4, 8).string("______").style(textStyle);

  const headers = Object.keys(customers[0]);
  headers.forEach((header, colIndex) => {
    worksheet.cell(6, colIndex + 1).string(header).style(textStyle);
  });

  customers.forEach((row, rowIndex) => {
    worksheet.cell(rowIndex + 1).string(rowIndex + 1);
    headers.forEach((header, colIndex) => {
      if (typeof row[header] !== String) row[header] = row[header].toString();
      worksheet.cell(rowIndex + 7, colIndex + 1).string(row[header]);
    });
  });

  const pathExcel = `${__dirname}/excel/listadoViaje_${date}.xlsx`;

  workbook.write(pathExcel, function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      response.download(pathExcel);
      return false;
    }
  });
};

exports.generateXLSX = async (request, response) => {
  const { id } = request.params;
  const data = await getData(id);
  let customers = data.map((item) => item.dataValues.customer.dataValues);
  customers = customers.map((item) => ({
    id: item.id,
    Identificacion: item.customerId,
    TipoID: item.type_id.dataValues.name,
    Nombre: item.name,
    Apellido: item.lastName,
    Email: item.email,
    Telefono: item.phone,
    Ciudad: item.city
  }));;
  const dataCompanions = await getDataCompanions(customers);
  makeXLSX(dataCompanions, response);
};
