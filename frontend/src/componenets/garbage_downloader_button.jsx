import useGarbages from "../hooks/useGarbages";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import CsvDownloader from "react-csv-downloader";
import React, { useMemo } from "react";

const GarbagesDownloderButton = () => {
  const { garbages, startEmptyingDate, endEmptyingDate } = useGarbages();
  const garbagesToDownload = useMemo(
    () =>
      garbages.map(({ id, emptyingDate, type, color, location }) => ({
        id,
        emptyingDate,
        type,
        color,
        longtitude: location.coordinates[0],
        latitude: location.coordinates[1],
      })),
    [garbages]
  );

  return (
    <CsvDownloader
      filename={`Garbage_${startEmptyingDate || ""}-_${endEmptyingDate || ""}`}
      extension=".csv"
      separator=","
      wrapColumnChar=""
      datas={garbagesToDownload}
      text="DOWNLOAD"
    >
      <Button variant="contained" color="secondary" startIcon={<GetAppIcon />}>
        Download
      </Button>
    </CsvDownloader>
  );
};

export default GarbagesDownloderButton;
