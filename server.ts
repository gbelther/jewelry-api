// @ts-nocheck
import "dotenv/config";
import express from "express";
import data from "./data";

const app = express();

app.use(express.json());

app.get("/report", async (request, response) => {
  try {
    const dataMapped = data.map((item) => {
      return {
        nome: item.Nome,
        cpf: item.CPF,
        titular: item["É titular?"] === "T",
        setor: item.Setor || undefined,
        cargo: item.Cargo || undefined,
        hipertensao: {
          ocupacional:
            item["Hipertensão Ocupacional"] === ""
              ? undefined
              : item["Hipertensão Ocupacional"],
          plano:
            item["Hipertensão Plano"] === ""
              ? undefined
              : item["Hipertensão Plano"],
        },
        diabetes: {
          ocupacional:
            item["Diabetes Ocupacional"] === ""
              ? undefined
              : item["Diabetes Ocupacional"],
          plano:
            item["Diabetes Plano"] === "" ? undefined : item["Diabetes Plano"],
        },
        ortopedico: {
          ocupacional:
            item["Ortopédico Ocupacional"] === ""
              ? undefined
              : item["Ortopédico Ocupacional"],
          plano:
            item["Ortopédico Plano"] === ""
              ? undefined
              : item["Ortopédico Plano"],
        },
        parto: {
          ocupacional:
            item["Parto Ocupacional"] === ""
              ? undefined
              : item["Parto Ocupacional"],
          plano: item["Parto Plano"] === "" ? undefined : item["Parto Plano"],
        },
        preventivo: {
          cancerMama:
            item["Preventivo Câncer Mama"] === ""
              ? undefined
              : item["Preventivo Câncer Mama"],
          cancerColoUtero:
            item["Preventivo Câncer Colo de Útero"] === ""
              ? undefined
              : item["Preventivo Câncer Colo de Útero"],
          cancerProstata:
            item["Preventivo Câncer Próstata"] === ""
              ? undefined
              : item["Preventivo Câncer Próstata"],
        },
        score: {
          comum: item["Score SRQ-20"] === "" ? undefined : item["Score SRQ-20"],
          ideacaoSuicida:
            item["Score SRQ-20 Ideação Suicída"] === ""
              ? undefined
              : item["Score SRQ-20 Ideação Suicída"],
        },
        evento: {
          consulta: {
            rede: item["Consulta Rede"],
            reembolso: item["Consulta Reembolso"],
          },
          exame: {
            rede: item["Exame Rede"],
            reembolso: item["Exame Reembolso"],
          },
          internacao: {
            rede: item["Internação Rede"],
            reembolso: item["Internação Reembolso"],
          },
          procedimentosAmbulatoriais: {
            rede: item["Proc. Ambulatorial Rede"],
            reembolso: item["Proc. Ambulatorial Reembolso"],
          },
          prontoSocorro: {
            rede: item["Pronto Socorro Rede"],
            reembolso: item["Pronto Socorro Reembolso"],
          },
          taxaMateriaisMedicamentos: {
            rede: item["Taxa/Mat/Med Rede"],
            reembolso: item["Taxa/Mat/Med Reembolso"],
          },
          terapia: {
            rede: item["Terapia Rede"],
            reembolso: item["Terapia Reembolso"],
          },
        },
      };
    });
    response.status(200).json({ dataMapped });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error });
  }
});

app.listen(3333, () => console.log("Server is running on port 3333!"));
