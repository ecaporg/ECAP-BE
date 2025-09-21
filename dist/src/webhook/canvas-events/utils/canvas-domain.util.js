"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCanvasDomain = exports.CANVAS_DOMAIN_REGEX = void 0;
exports.CANVAS_DOMAIN_REGEX = /[a-zA-Z0-9-]+\.instructure\.com/;
const extractCanvasDomain = (source) => {
    const sources = Array.isArray(source) ? source : [source];
    for (const src of sources) {
        const canvasDomainMatch = src.match(exports.CANVAS_DOMAIN_REGEX);
        if (canvasDomainMatch) {
            return canvasDomainMatch[0];
        }
    }
    return null;
};
exports.extractCanvasDomain = extractCanvasDomain;
//# sourceMappingURL=canvas-domain.util.js.map