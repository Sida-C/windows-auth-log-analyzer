# Event IDs Checked

The tool currently checks the following Windows Security Event IDs.

### 4624 = Successful Logon

This means an account successfully logged on. It is useful for building a timeline of access and checking what type of logon occurred.

### 4625 = Failed Logon

This means a logon attempt failed. A few failed logons can be normal, but repeated failed logons in a short time window may suggest password guessing, brute-force attempts, or a misconfigured service.

### 4672 = Special Privileges Assigned

This means the account logged on with special privileges, usually admin-level rights. This is important because privileged accounts have more impact if they are compromised.

This does not automatically mean privilege escalation happened. It means a privileged account logged on.

### 4648 = Explicit Credential Use

This means a logon was attempted using explicitly provided credentials. This can happen during normal admin activity, scheduled tasks, mapped drives, or “Run as different user.”

It can be suspicious if it appears near failed logons, unusual accounts, remote activity, or unexpected script/process activity.