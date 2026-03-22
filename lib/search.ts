import { knowledge } from "./knowledge"

export function searchKnowledge(query: string) {
    const q = query.toLowerCase()

    return knowledge
        .filter(k => k.content.toLowerCase().includes(q))
        .slice(0, 3)
}
