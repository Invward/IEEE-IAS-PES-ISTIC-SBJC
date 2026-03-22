import { EVENTS, TEAM, MEMBERS_OF_MONTH, STATS } from "./data"

export const knowledge = [
    ...STATS.map(stat => ({
        content: `${stat.num} ${stat.label}`
    })),

    ...EVENTS.map(event => ({
        content: `Event: ${event.title}.
Date: ${event.month} ${event.day}.
Description: ${event.desc}.
Tags: ${event.tags.join(", ")}.
Status: ${event.upcoming ? "Upcoming event" : "Completed event"}`
    })),

    ...TEAM.map(member => ({
        content: `${member.name} is the ${member.role} of the IEEE ISTIC IAS PES Student Branch Chapter. 
Department: ${member.dept}.`
    })),

    ...MEMBERS_OF_MONTH.map(member => ({
        content: `${member.name} was Member of the Month (${member.badge}). 
Role: ${member.role}. 
Achievement: ${member.quote}`
    }))
]
