import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import PictureAsPdfRoundedIcon from "@mui/icons-material/Article";
import axios, { AxiosError } from "axios";
import { Puff } from "react-loader-spinner";

const fileTypes: string[] = ["CSV"];

interface Props {
  setData?: any;
}

function FileUpload(props: Props) {
  const { setData } = props;
  const [files, setFile] = useState<any>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (fileOrFiles: any) => {
    setFile((files: any) => [...files, ...fileOrFiles]);
    console.log("changes", fileOrFiles);
  };
  const onDrop = (fileOrFiles: any) => {
    console.log("drop", fileOrFiles);
  };
  const onSelect = (fileOrFiles: any) => {
    console.log("test", fileOrFiles);
  };

  const onTypeError = (err = 1) => {
    // notifyError(`${err}` || "something went wrong");
    console.log("sourav", err);
  };
  const onSizeError = (err = 1) => console.log(err);

  const handleUpload = async () => {
    if (files.length === 0) {
      console.log("No files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file: any, index: number) => {
      formData.append(`file`, file);
    });
    console.log(
      "🚀 ~ file: gptAPI.tsx:29 ~ handleUpload ~ formData:",
      formData
    );
    setLoader(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = res.data;
      setData({ status: 200, payload: data });
      setLoader(false);
      console.log(
        "🚀 ~ file: huggingFaceAPI.tsx:107 ~ handleUpload ~ data:",
        data
      );
      const huggingFaceAPIData = {
        nagativePercentage: data["Negative Percentage"],
        positivePercentage: data["Positive Percentage"],
        negativeSummary: data["Negative Summaries"],
        positiveSummary: data["Positive Summaries"],
      };
    } catch (err) {
      const error = err as AxiosError;
      setData({ status: 400, payload: {} });
      setLoader(false);

      //   notifyError(error.message || "something went wrong");
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ width: "80%" }}>
      <FileUploader
        className="uploader"
        fileOrFiles={files}
        onTypeError={onTypeError}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        onSizeError={onSizeError}
        onDrop={onDrop}
        onSelect={onSelect}
        label="Upload file here"
        dropMessageStyle={{ backgroundColor: "orange" }}
        multiple={true}
      >
        <Box
          sx={{
            borderStyle: "dashed",
            borderWidth: 2,
            width: "100%",
            borderColor: "#ccc",
            borderRadius: 3,
            backgroundColor: "#fff",
            paddingTop: 5,
            paddingBottom: 5,
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <PictureAsPdfRoundedIcon
            style={{
              width: "60px",
              height: "60px",
              color: "#f58220",
            }}
          />
          {files.length > 0 ? (
            files.map((val: any, index: number) => (
              <Typography key={index}>{val?.name}</Typography>
            ))
          ) : (
            <Typography variant="subtitle1">Upload file</Typography>
          )}
        </Box>
      </FileUploader>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{
            textAlign: "center",
            display: "flex",
            marginTop: "20px",
            width: "100%",
            boxShadow: 0,
            color: "white",
            borderRadius: 1.5,
            textTransform: "capitalize",
            fontWeight: 600,
          }}
        >
          Upload file
        </Button>
      </Box>

      {loader ? (
        <Box
          component="div"
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.6)" // Set the background color with transparency
        >
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#f58220"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </Box>
      ) : null}
    </Box>
  );
}

export default FileUpload;
