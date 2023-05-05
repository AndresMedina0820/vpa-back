const excel = require('excel4node');
const { getUnixTime } = require('date-fns');
const bookingCustomersService = require('../services/bookingCustomersService');
const companionsXCustomers = require('../services/companionsXCustomers');
const path = require('path');
const { format } = require('date-fns');
const { es } = require('date-fns/locale');
const fs = require('fs');
const colorPalette = ['#ffeaa7', '#74b9ff', '#ff7675', '#00b894', '#a29bfe'];

const _bookingCustomersService = new bookingCustomersService();
const _companionsXCustomers = new companionsXCustomers();

getData = async (id) => {
  const booking = await _bookingCustomersService.find(id);
  const bookingData = booking.map((booking) => booking.dataValues.customer);
  return bookingData;
};

getDataCompanions = async (customerId) => {
  const companions = await _companionsXCustomers.findByCustomer(customerId);
  const companionsData = companions.map(
    (companion) => companion.dataValues.companion
  );
  return companionsData;
};

makeXLSX = async (customers) => {
  const date = getUnixTime(new Date());
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Clientes');

  const textStyle = workbook.createStyle({
    font: { color: 'black', size: 12, bold: true },
  });

  const headerStyle = workbook.createStyle({
    font: { color: 'black', size: 12, bold: true },
    border: {
      left: { style: 'thin', color: 'black' },
      right: { style: 'thin', color: 'black' },
      top: { style: 'thin', color: 'black' },
      bottom: { style: 'medium', color: 'black' },
    },
  });

  // Image
  worksheet.addImage({
    image: fs.readFileSync(
      path.resolve(__dirname, '../assets/images/logo.png')
    ),
    name: 'logo',
    type: 'picture',
    position: {
      type: 'twoCellAnchor',
      from: {
        col: 1,
        colOff: 0,
        row: 1,
        rowOff: 0,
      },
      to: {
        col: 3,
        colOff: 0,
        row: 5,
        rowOff: 0,
      },
    },
  });

  // Headers
  worksheet.cell(6, 1).string('Fecha').style(textStyle);
  worksheet.cell(7, 1).string('Destino').style(textStyle);
  worksheet.cell(8, 1).string('Coordinador').style(textStyle);
  worksheet.cell(9, 1).string('Contacto').style(textStyle);

  worksheet
    .cell(6, 2, 6, 3, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });
  worksheet
    .cell(7, 2, 7, 3, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });
  worksheet
    .cell(8, 2, 8, 3, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });
  worksheet
    .cell(9, 2, 9, 3, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });

  worksheet.cell(6, 5).string('Conductor').style(textStyle);
  worksheet.cell(7, 5).string('Contacto').style(textStyle);
  worksheet.cell(8, 5).string('Placas').style(textStyle);
  worksheet.cell(9, 5).string('Transportadora').style(textStyle);

  worksheet
    .cell(6, 6, 6, 7, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });
  worksheet
    .cell(7, 6, 7, 7, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });
  worksheet
    .cell(8, 6, 8, 7, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });
  worksheet
    .cell(9, 6, 9, 7, true)
    .style({ border: { bottom: { style: 'medium', color: 'black' } } });

  // Headers Table
  worksheet.cell(11, 1).string('NOMBRE').style(headerStyle);
  worksheet.cell(11, 2).string('APELLIDO').style(headerStyle);
  worksheet.cell(11, 3).string('C.C.').style(headerStyle);
  worksheet.cell(11, 4).string('FECHA DE NACIMIENTO').style(headerStyle);
  worksheet.cell(11, 5).string('TELEFONO').style(headerStyle);
  worksheet.cell(11, 6).string('CIUDAD').style(headerStyle);
  worksheet.cell(11, 7).string('ES INFANTE?').style(headerStyle);

  let rowConsecutive = 12;
  let indexColorPalette = 0;

  customers.forEach((customer) => {
    let columnConsecutive = 1;

    if (indexColorPalette > 4) {
      indexColorPalette = 0;
    }

    const dataStyle = workbook.createStyle({
      border: {
        left: { style: 'thin', color: 'black' },
        right: { style: 'thin', color: 'black' },
        top: { style: 'thin', color: 'black' },
        bottom: { style: 'thin', color: 'black' },
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: colorPalette[indexColorPalette],
        fgColor: colorPalette[indexColorPalette],
      },
    });

    for (const key in customer) {
      if (key !== 'companions') {
        if (key === 'isChild') {
          const isChildValidation = customer[key] ? 'X' : '';
          worksheet
            .cell(rowConsecutive, columnConsecutive)
            .string(isChildValidation)
            .style(dataStyle);
        } else {
          worksheet
            .cell(rowConsecutive, columnConsecutive)
            .string(customer[key])
            .style(dataStyle);
        }
        columnConsecutive += 1;
      }
    }
    rowConsecutive += 1;

    if (customer?.companions) {
      customer?.companions.forEach((companion) => {
        columnConsecutive = 1;
        for (const key in companion) {
          worksheet
            .cell(rowConsecutive, columnConsecutive)
            .string(companion[key])
            .style(dataStyle);
          columnConsecutive += 1;
        }
        rowConsecutive += 1;
      });
    }

    indexColorPalette += 1;
  });

  const pathExcel = path.join(
    __dirname,
    `../temp/xlsx/listadoViaje_${date}.xlsx`
  );

  return new Promise((resolve, reject) => {
    workbook.write(pathExcel, function (err) {
      if (err) {
        // TODO: Cambiar por boom errors
        console.log(err);
        reject(err);
        return;
      } else {
        resolve(pathExcel);
      }
    });
  });
};

formatDate = (date) => {
  if (!date) return;
  const dateISO = new Date(date);
  const dateFormat = format(dateISO, 'dd-MMMM-yyyy', { locale: es });
  return dateFormat;
};

generateXLSX = async (id) => {
  const mainCustomers = await getData(id);
  const data = await Promise.all(
    mainCustomers.map(async (mainCustomer) => {
      const companions = await getDataCompanions(mainCustomer.id);
      return {
        name: mainCustomer?.name || '',
        lastName: mainCustomer?.lastName || '',
        customerId: mainCustomer?.customerId.toString() || '',
        dateBirth: formatDate(mainCustomer?.dateBirth) || '',
        phone: mainCustomer?.phone || '',
        city: mainCustomer?.city || '',
        isChild: mainCustomer?.isChild ? 'X' : '' || '',
        companions: companions.map((companion) => {
          return {
            name: companion?.name || '',
            lastName: companion?.lastName || '',
            customerId: companion?.customerId.toString() || '',
            dateBirth: formatDate(companion?.dateBirth) || '',
            phone: companion?.phone || '',
            city: companion?.city || '',
            isChild: companion?.isChild ? 'X' : '' || '',
          };
        }),
      };
    })
  );
  return await makeXLSX(data);
};

module.exports = { generateXLSX };
