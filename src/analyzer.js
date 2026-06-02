import { writeFile } from 'fs/promises';
import * as getEvent from "../scripts/getEvent.js";

async function generateSummary() {
    let summary = [];

    const date = new Date();

    const failedLogin = await getEvent.getEvent(4625, "Failed Login");
    const successfulLogin = await getEvent.getEvent(4624, "Successful Login")
    const privilegedLogOn = await getEvent.getEvent(4672, "Privileged Log On");
    const explicitCredentialUse = await getEvent.getEvent(4648, "Explicit Credential Use");
    const total = failedLogin.length + successfulLogin.length + privilegedLogOn.length + explicitCredentialUse.length;

    const uniqueFailedIp = await getEvent.getUniqueIp(failedLogin);
    const checkTime = await getEvent.getTimeDiff();

    summary.push({
        "Generated on:": `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
        "Summary": {
            totalEvents: total,
            lookbackRange: "Most recent 50 logs from past 10 days",
            successfulLogins: successfulLogin.length,
            failedLogins: failedLogin.length,
            privilegedLogons: privilegedLogOn.length,
            explicitCredentialUse: explicitCredentialUse.length
        },
        "Analysis": {
            uniqueFailedIp: uniqueFailedIp,
            repeatedFailedLogins: checkTime,
        },
        "Events":{
            successfulLogins: successfulLogin,
            failedLogins: failedLogin,
            privilegedLogons: privilegedLogOn,
            explicitCredentialUse: explicitCredentialUse,
        }
    })
    writeFile("./output/auth-summary.json", JSON.stringify(summary, null, 2), "utf8");
}

await generateSummary();