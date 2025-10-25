import { arteriasVeiasMembroInferior } from "./arterias-veias-membro-inferior"
import { arteriasVeiasMembroSuperior } from "./arterias-veias-membro-superior"
import { articulacoes } from "./articulacoes"
import { coracao } from "./coracao"
import { cranio } from "./cranio"
import { musculosMembroInferior } from "./musculos-membro-inferior"
import { musculosMembroSuperior } from "./musculos-membro-superior"
import { musculosVasosNervosFacial } from "./musculos-vasos-nervos-facial"
import { nervosMembros } from "./nervos-membros"
import { ossosMembroInferior } from "./ossos-membro-inferior"
import { ossosMembroSuperior } from "./ossos-membro-superior"
import { paredeToracicaTGI } from "./parede-toracica-tgi"
import { retroperitonioSistemaUrinario } from "./retroperitonio-sistema-urinario"
import { sistemaRespiratorioRegiaoCervical } from "./sistema-respiratorio-regiao-cervical"

export const allPraticaTopics: Record<string, any> = {
  "arterias-veias-membro-inferior": arteriasVeiasMembroInferior,
  "arterias-veias-membro-superior": arteriasVeiasMembroSuperior,
  "articulacoes": articulacoes,
  "coracao": coracao,
  "cranio": cranio,
  "musculos-membro-inferior": musculosMembroInferior,
  "musculos-membro-superior": musculosMembroSuperior,
  "musculos-vasos-nervos-facial": musculosVasosNervosFacial,
  "nervos-membros": nervosMembros,
  "ossos-membro-inferior": ossosMembroInferior,
  "ossos-membro-superior": ossosMembroSuperior,
  "parede-toracica-tgi": paredeToracicaTGI,
  "retroperitonio-sistema-urinario": retroperitonioSistemaUrinario,
  "sistema-respiratorio-regiao-cervical": sistemaRespiratorioRegiaoCervical,
}
