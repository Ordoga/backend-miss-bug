import { utilService } from "./util.service.js"
import { bugs, _saveBugsToFile } from "./bug-service.js"

async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (bugIdx === -1)
                throw new error(
                    `Could not find bug with id ${bugToSave._id}`,
                    (bugToSave.createdAt = bugs[bugIdx].createdAt),
                    (bugs[bugIdx] = bugToSave)
                )
            return bugToSave
        } else {
            bugToSave._id = utilService.makeId()
            bugToSave.createdAt = Date.now()
            bugs.push(bugToSave)
        }
        await _saveBugsToFile()
        return bugToSave
    } catch (err) {}
}
