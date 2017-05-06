package com.justdial.crawler;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExportToXLS {

	public void createXLS(List<Electrician> lislectrician) throws IOException {
		XSSFWorkbook workbook = new XSSFWorkbook();
		// Create a blank sheet
		XSSFSheet spreadsheet = workbook.createSheet("Just Dial Carpenters");
		// Create row object
		XSSFRow row;
		// This data needs to be written (Object[])
		Map<String, Object[]> empinfo = new TreeMap<String, Object[]>();
		empinfo.put("1", new Object[] { "NAME", "ADDRESS", "VOTES", "PHONENUMBER" });

		for (int j = 0; j < lislectrician.size(); j++) {

			String rowNum = String.valueOf(j + 2);

			empinfo.put(rowNum, new Object[] { lislectrician.get(j).getName(), lislectrician.get(j).getAddress(),
					lislectrician.get(j).getNumvotes(), lislectrician.get(j).getPhonenum() });
		}

		// Iterate over data and write to sheet
		Set<String> keyid = empinfo.keySet();
		int rowid = 0;
		for (String key : keyid) {
			row = spreadsheet.createRow(rowid++);
			Object[] objectArr = empinfo.get(key);
			int cellid = 0;
			for (Object obj : objectArr) {
				Cell cell = row.createCell(cellid++);
				cell.setCellValue((String) obj);
			}
		}
		// Write the workbook in file system
		FileOutputStream out = new FileOutputStream(new File("Just_Dial_"+System.currentTimeMillis()+"Plumbers.xlsx"));
		workbook.write(out);
		out.close();
		System.out.println("Just_Dial_Plumbers.xlsx written successfully");
	}

}
