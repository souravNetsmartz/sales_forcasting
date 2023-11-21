import { Box, Typography } from "@mui/material";
import { useState } from "react";
import FileUpload from "../../components/fileUpload";
import Navbar from "../../components/navbar/navbar";
import DataTable from "../../components/salesTable";

export default function Home() {
  const [data, setData] = useState<any>({
    status: undefined,
    payload: undefined,
  });

  return (
    <>
      <Navbar />
      <Box>
        {data.status === undefined ? (
          <>
            <Box
              display={"flex"}
              flex={1}
              component={"div"}
              sx={{ height: "calc(100vh - 64px)" }}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Typography fontWeight={"bold"} fontSize={30} gutterBottom>
                Please upload CSV file
              </Typography>
              <FileUpload setData={setData} />
            </Box>
          </>
        ) : data.status === 200 ? (
          <>
            <Box display={"flex"} justifyContent={"center"} gap={8}>
              <DataTable data={data?.payload?.Input_Data} title="Sales Data" />
              <DataTable
                data={data?.payload?.Future_forecasted_values}
                title="Future Sales Forecast"
              />
            </Box>
            <Box textAlign={"center"}>
              {/* <img
                src="http://127.0.0.1:8000/seasonal_plot"
                alt="seasonal plot"
              /> */}
              <img src="http://127.0.0.1:8000/trend_plot" alt="trend plot" />
              <img
                src="http://127.0.0.1:8000/forecast_plot"
                alt="forcast plot"
              />
            </Box>
          </>
        ) : (
          <div>error</div>
        )}
      </Box>
    </>
  );
}
