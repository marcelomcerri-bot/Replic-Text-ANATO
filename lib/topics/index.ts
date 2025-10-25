import type { TopicContent } from "../topics-data"
import { introducaoAnatomia } from "./introducao-anatomia"
import { sistemaMuscular } from "./sistema-muscular"
import { sistemaArticular } from "./sistema-articular"
import { sistemaNervoso } from "./sistema-nervoso"
import { sistemaCirculatorio } from "./sistema-circulatorio"
import { sistemaUrinario } from "./sistema-urinario"
import { glandulasAnexas } from "./glandulas-anexas"
import { sistemaGenitalMasculino } from "./sistema-genital-masculino"
import { sistemaDigestorio } from "./sistema-digestorio"
import { viasBiliares } from "./vias-biliares"
import { canalInguinal } from "./canal-inguinal"
import { sistemaGenitalFeminino } from "./sistema-genital-feminino"
import { cranio } from "./cranio"
import { colunaVertebral } from "./coluna-vertebral"
import { pescoco } from "./pescoco"
import { paredeToracica } from "./parede-toracica"
import { face } from "./face"
import { sistemaRespiratorio } from "./sistema-respiratorio"
import { coracao } from "./coracao"
import { vasosBase } from "./vasos-base"
import { sistemaEsqueletico } from "./sistema-esqueletico"
import { paredeAbdominal } from "./parede-abdominal"

// Export all topics in a single object
export const allTopics: Record<string, TopicContent> = {
  "introducao-anatomia": introducaoAnatomia,
  introducao_anatomia: introducaoAnatomia,
  "sistema-muscular": sistemaMuscular,
  sistema_muscular: sistemaMuscular,
  "sistema-articular": sistemaArticular,
  sistema_articular: sistemaArticular,
  "sistema-nervoso": sistemaNervoso,
  sistema_nervoso: sistemaNervoso,
  "sistema-circulatorio": sistemaCirculatorio,
  sistema_circulatorio: sistemaCirculatorio,
  "sistema-urinario": sistemaUrinario,
  sistema_urinario: sistemaUrinario,
  "glandulas-anexas": glandulasAnexas,
  glandulas_anexas: glandulasAnexas,
  "sistema-genital-masculino": sistemaGenitalMasculino,
  sistema_genital_masculino: sistemaGenitalMasculino,
  "sistema-digestorio": sistemaDigestorio,
  sistema_digestorio: sistemaDigestorio,
  "vias-biliares": viasBiliares,
  vias_biliares: viasBiliares,
  "canal-inguinal": canalInguinal,
  canal_inguinal: canalInguinal,
  "sistema-genital-feminino": sistemaGenitalFeminino,
  sistema_genital_feminino: sistemaGenitalFeminino,
  cranio: cranio,
  "coluna-vertebral": colunaVertebral,
  coluna_vertebral: colunaVertebral,
  coluna: colunaVertebral,
  pescoco: pescoco,
  "parede-toracica": paredeToracica,
  parede_toracica: paredeToracica,
  face: face,
  "sistema-respiratorio": sistemaRespiratorio,
  sistema_respiratorio: sistemaRespiratorio,
  coracao: coracao,
  "vasos-base": vasosBase,
  vasos_base: vasosBase,
  "sistema-esqueletico": sistemaEsqueletico,
  sistema_esqueletico: sistemaEsqueletico,
  "parede-abdominal": paredeAbdominal,
  parede_abdominal: paredeAbdominal,
}
