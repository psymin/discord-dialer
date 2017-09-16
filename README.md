# Discord dialer

Minimal Discord dialer that connects to Discord and relays back commands to the phone (a web page with SIP.js). Requires a WebRTC-compatible SIP server. May serve as inspiration for your own.

Once you've navigated to the client web page you'll need to link it up with Discord through audio routing as you would with a normal dialer.

Tested with latest Firefox (55) and Asterisk (14.6).

The `public/audio/goodbye.wav` is borrowed from the Asterisk sounds collection and thus respects its licence. Please see `public/audio/LICENCE` for more.

## Layout

```
+-------------------------+
|                         |
|      Discord API        |
|                         |
+-+---------------------+-+
  |                     |
  |  Discord messages   |
  |                     |
+-v---------------------v-+
|                         |
| node index.js (server)  |
|                         |
+-+---------------------+-+
  |                     |
  |     WebSockets      |
  |                     |           +------------------------+
+-v---------------------v-+         |                        |
|                         +--------->  WebRTC-compatible     |
|  Browser (index.html)   |         |  SIP server            |
|                         <---------+                        |
+-+---------------------^-+         |                        |
  |                     |           +------------------------+
  |    Audio routing    |
  |                     |
+-v---------------------+-+
|                         |
|    Discord client       |
|                         |
+-------------------------+
```

## Todo

* Make the client configuration modifiable through a form that stores data in the browser's local storage.
* Consider adding other audio responses for certain events
