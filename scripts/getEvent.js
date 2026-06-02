import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

let failedTimeTracker = [];

export const getEvent = async (eventID, message) => {
    let collection = [];

    const command = `Get-EventLog Security -After (Get-Date).AddDays(-10) -InstanceId ${eventID} -Newest 50 | Select-Object TimeGenerated,Message | Format-List`;
    const {stdout} = await execFileAsync("powershell.exe", ["-NoProfile", "-Command", command]);
    stdout.split("TimeGenerated : ").forEach((n) => {
        let time = "";
        let username = "";

        const findTime = n.match(/\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} [A-Z]M/);
        const findUsername = n.match(/Account Name:\s+([^\r\n]+)/);

        if (findTime && findUsername) {
            time = findTime[0];
            username = findUsername[1].trim();

            let temp = {
                "TimeGenerated": time,
                "Id": eventID,
                "Message": message,
                "Username": username.trim()
            }

            switch (eventID) {
                case 4624:
                    temp.logonType = n.match(/Logon Type:\s+(\d+)/)[1];
                    break;
                case 4625:
                    temp.logonType = n.match(/Logon Type:\s+(\d+)/)[1];
                    temp.sourceIp = n.match(/Source Network Address:\s+(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})/)[1];
                    failedTimeTracker.push(new Date(findTime).getTime());
                    break;
            }

            collection.push(temp);
        }
    });
    return collection;
};

export const getUniqueIp = async (getEvent) => {
    return new Set(getEvent.map((obj) => obj.sourceIp)).size;
}

export const getTimeDiff = async () => {
    const warning = [];
    let unclear = [];

    const sorted = [...failedTimeTracker].sort((a, b) => a - b);

    for (let i = 0; i < sorted.length; i++) {
        const diff = sorted[i + 1] - sorted[i];
        if (diff <= 10 * 1000) {
            unclear.push(new Date(sorted[i]).toLocaleString());
        } else {
            if (unclear.length > 3) {
                warning.push(
                    {
                        count:unclear.length,
                        times: [...unclear]});
            }
            unclear = [];
        }
    }
    return warning;
}

// Get-EventLog Security | Where-Object {$_.EventID -eq 4625 -and $_.TimeGenerated -ge (Get-Date).AddDays(-10)} | Select-Object TimeGenerated,Message | Format-List