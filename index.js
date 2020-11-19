import express from "express";
import cors from "cors";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { toTitleCase, getOperationStatus } from "./utils.js";
import { colors } from "./consts.js";
dayjs.extend(customParseFormat);
const app = express();
app.use(cors());

app.get("/subway-lines/status", (req, resp) => {
  axios
    .get(
      "https://www.viamobilidade.com.br/_vti_bin/SituacaoService.svc/GetAllSituacao"
    )
    .then(({ data }) => {
      const lineStatuses = data.map((item) => {
        const updatedAt = dayjs(item.Geracao, "DD-MM-YYYY HH:mm").toISOString();
        return {
          updatedAt,
          description: item.Descricao || item.MensagemSituacao,
          status: getOperationStatus(item.StatusOperacao),
          statusDescription: item.StatusOperacao,
          line: {
            number: item.Codigo,
            name: toTitleCase(item.Nome),
            color: colors[item.Cor] || item.Cor,
            company: item.Posicao,
          },
        };
      });
      resp.json(lineStatuses);
    })
    .catch((error) => {
      console.log(error);
      resp
        .status(500)
        .json({ message: "Error contacting subway API", code: "ESUBWAYAPI" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`subway api listening at ${PORT}`);
});
