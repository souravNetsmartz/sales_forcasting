import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const DataTable = ({ data, title }: any) => {
  if (!data || !data["Invoice Date"] || !data["Invoice_Amount"]) {
    return null; // Handle the case when data is missing or has an unexpected structure
  }

  const dateKeys = Object.values(data["Invoice Date"]);
  const amountValues = Object.values(data["Invoice_Amount"]);

  const tableData = dateKeys.map((date, index) => ({
    date,
    amount: amountValues[index],
  }));

  return (
    <Box padding={4}>
      <Typography
        component={"h2"}
        // marginTop={4}
        variant="h6"
        fontWeight={"700"}
        textAlign={"center"}
        gutterBottom
      >
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ height: 300, width: 500 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "lightgrey", position: "sticky", top: 0 }}
            >
              <TableCell
                sx={{ borderRight: "1px solid lightgrey", textAlign: "center" }}
              >
                Date
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Invoice Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderRight: "0.7px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  {row.date}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{`${Number(
                  row.amount
                ).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
