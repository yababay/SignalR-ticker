# SignalR-ticker

There is a simplie web application that receives random data (integer numbers from 30 to 95) generated on a server into a web page. The data are transfered from server to client via SignalR messages permanently, 1 piece per second.

For starting service please make sure that dotnet environment is set up on your computer. Then run in the projects directory:

```
dotnet watch run
```

The page will be opened in seperate tab of your default browser.

The most interest branch here is `d3-line-chart`. It demonstrates dynamically pushing data received from server into d3 chart.

Is there a way to express the same idea with Python? Of course! You cat see a solution on the `pithon` branch. But it is made with simple Websocket, not SignalR connection.

