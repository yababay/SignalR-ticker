const connection = new signalR.HubConnectionBuilder().withUrl("/ticker").build();

connection.on("ReceiveMessage", function (user, message) {
    const p = document.createElement("p")
    document.body.appendChild(p)
    p.textContent = `${user} says ${message}`
})

connection.start()