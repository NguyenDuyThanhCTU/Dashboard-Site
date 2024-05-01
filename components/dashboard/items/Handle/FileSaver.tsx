import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import { saveAs } from 'file-saver';
import XlsxPopulate from 'xlsx-populate';
interface FileSaverProps {
  Data: Array<any>;
}
const FileSaver = ({ Data }: FileSaverProps) => {
  function getSheetData(data: any, header: any) {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row: any) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : '';
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function HandleExportExcel() {
    var data = Data;
    //get all header from Data keys
    const header = Object.keys(Data[0]);

    XlsxPopulate.fromBlankAsync().then(async (workbook: any) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell('A1').value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style('bold', true);
      sheet1.range('A1:' + endColumn + '1').style('fill', 'BFBFBF');
      range.style('border', true);
      return workbook.outputAsync().then((res: any) => {
        saveAs(res, 'file.xlsx');
      });
    });
  }
  return (
    <div
      className="flex px-5 py-2 border-green-500 border text-green-500 rounded-full items-center cursor-pointer text-[25px] gap-3 hover:bg-green-600 hover:text-white duration-300"
      onClick={() => HandleExportExcel()}
    >
      {' '}
      <SiMicrosoftexcel />
      <p className="text-[16px]"> Xuất File Excel </p>
    </div>
  );
};

export default FileSaver;
