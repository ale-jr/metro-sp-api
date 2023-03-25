import { JSDOM } from "jsdom"
import { statuses } from "./consts.js"
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

export const getStatus = () =>
    fetch("https://www.viamobilidade.com.br/")
        .then((response) => response.text())
        .then(html => {
            const dom = new JSDOM(html)
            const lines = []
            dom.window.document.querySelectorAll("li[class*='line-']").forEach(line => {
                const name = line.querySelector('span[title]')?.getAttribute('title')
                const lineNumber = Array.from(line.classList)?.find(c => c?.startsWith('line-'))?.split('-')[1]
                const reason = line.querySelector('p')?.textContent
                const statusDescription = line.querySelector('.status')?.textContent
                const statusColor = Array.from(line.querySelector('.status')?.classList || []).find(c => c != "status")
                const status = statuses[statusColor]
                lines.push({
                    name,
                    number: lineNumber,
                    reason,
                    statusDescription,
                    status
                })
            })

            const rawDate = dom.window.document.querySelector('.lines p strong')?.textContent


            const updatedAt = rawDate && dayjs(rawDate, "DD/MM/YYYY HH:mm:ss").toISOString()

            return {
                lines,
                updatedAt
            }
        })


