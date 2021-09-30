using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using System.Threading;
using webapi_signalr.Hubs;

namespace webapi_signalr.Services
{

    public interface IOpcUaService
    {
        Task WriteMessage(string message);
    }

    public class OpcUaService : IOpcUaService
    {
        public IHubContext<TickerHub, IChatClient> _strongChatHubContext { get; }
        private readonly Random _random = new Random();
        private readonly int top = 65;
        private readonly int bottom = 30;

        public OpcUaService(IHubContext<TickerHub, IChatClient> chatHubContext)
        {

            _strongChatHubContext = chatHubContext;

            Task.Run(async () => {
                while(true) {    
                    await this.WriteMessage("async message");
                    Thread.Sleep(1000);
                }
            });

        }

        public async Task WriteMessage(string message)
        {
            int rInt = _random.Next(0, top);
            rInt += bottom;
            System.Console.WriteLine($"OpcUaService data: {rInt}");
            await _strongChatHubContext.Clients.All.ReceiveMessage("ticker", "" + rInt);
        }
    }

}

