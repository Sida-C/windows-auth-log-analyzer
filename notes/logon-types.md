# Logon Types Checked

The following Windows logon types are used to understand the context of authentication events.

### 2 = Interactive / Local Logon

This usually means someone logged in directly at the computer, such as typing a password at the lock screen.

### 3 = Network Logon

This happens when someone or something accesses the computer over the network, such as shared files, remote services, or network authentication.

### 5 = Service Logon

This happens when a Windows service starts using an account. These are often background processes, so they can create a lot of normal log activity.

### 7 = Unlock

This happens when someone unlocks a computer that already had an active logged-in session.

### 10 = Remote Interactive / RDP

This happens when someone logs in using Remote Desktop or another remote interactive session.