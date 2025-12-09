import { created, ok } from '../../core/response.js'
import { analyze } from '../../services/analysis.service.js'
import { listCaptures } from '../../services/storage.service.js'
export function postAnalysis(req, res) { const out = analyze(req.body); created(res, out) }
export function getAnalyses(req, res) { ok(res, listCaptures()) }