import DOMPurify from 'dompurify'

const ALLOWED_TAGS = ['p', 'ul', 'ol', 'li', 'br', 'strong', 'em']

export function sanitizeDescription(html) {
    if (!html) {
        return ''
    }

    return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR: [] })
}

export function toPlainText(html) {
    if (!html) {
        return ''
    }

    const spaced = html.replace(/<\/(p|li|ul|ol)>/gi, ' ')
    const parsed = new DOMParser().parseFromString(spaced, 'text/html')

    return (parsed.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}