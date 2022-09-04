import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

interface PredictionInterface {
  Scrip?: string;
  Time?: number;
  Close?: number;
  LstmPrediction?: number;
  GruPrediction?: number;
}

export const PredictionCard = () => {
  const [nepseData, setNepseData] = useState<PredictionInterface>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getNepseData();
  }, []);

  const getNepseData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/nepseOneDayPrediction"
      );
      if (response.status === 200) {
        setNepseData(response.data);
        setIsLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const date = new Date();

  function handleClick() {
    navigate("/nepsePrediction");
  }

  return (
    <div>
      {!isLoading ? (
        <Card
          variant="elevation"
          raised
          sx={{ ml: -15, minWidth: "180px" }}
          onClick={handleClick}
        >
          <CardHeader
            title={"Prediction"}
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{ align: "center" }}
            sx={{ backgroundColor: "#4D6C96" }}
          />
          <CardContent sx={{ backgroundColor: "#091929" }}>
            <Stack direction="row">
              <Typography
                component="h5"
                variant="h5"
                color={"white"}
                align="center"
              >
                LSTM :
              </Typography>
              <Typography
                component="h5"
                variant="h5"
                align="center"
                color={"green"}
              >
                : {Number(nepseData.LstmPrediction).toFixed(2)}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography
                component="h5"
                variant="h5"
                color={"white"}
                align="center"
              >
                GRU :
              </Typography>
              <Typography
                component="h5"
                variant="h5"
                align="center"
                color={"green"}
              >
                : {Number(nepseData.GruPrediction).toFixed(2)}
              </Typography>
            </Stack>
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color={"red"}
            >
              {Math.abs(
                nepseData.LstmPrediction! - nepseData.GruPrediction!
              ).toFixed(2)}
            </Typography>
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color={"red"}
            >
              {date.toLocaleDateString()}
              {/* {formatDate(nepseData?.Time)} */}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
