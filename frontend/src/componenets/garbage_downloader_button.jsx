import useGarbages from "../hooks/useGarbages";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import CsvDownloader from "react-csv-downloader";

const GarbagesDownloderButton = () => {
  const { garbages, startEmptyingDate, endEmptyingDate } = useGarbages();
  return (
    <CsvDownloader
      filename={`Garbage_${startEmptyingDate || ""}-_${endEmptyingDate || ""}`}
      extension=".csv"
      separator=","
      wrapColumnChar=""
      datas={garbages}
      text="DOWNLOAD"
    >
      <Button variant="contained" color="secondary" startIcon={<GetAppIcon />}>
        Download
      </Button>
    </CsvDownloader>
  );
};

export default GarbagesDownloderButton;
