using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using System.Threading;
using webapi_signalr.Hubs;

namespace webapi_signalr.Services
{

    public interface ITickerService
    {
        Task WriteMessage(int rInt);
    }

    public class TickerService : ITickerService
    {
        public IHubContext<TickerHub, IChatClient> _strongChatHubContext { get; }
        private readonly Random _random = new Random();
        private readonly int top = 65;
        private readonly int bottom = 30;

        public TickerService(IHubContext<TickerHub, IChatClient> chatHubContext)
        {

            _strongChatHubContext = chatHubContext;

            Task.Run(async () => {
                while(true) {    
                    int rInt = _random.Next(0, top);
                    rInt += bottom;
                    await this.WriteMessage(rInt);
                    Thread.Sleep(1000);
                }
            });

        }

        public async Task WriteMessage(int rInt)
        {
            System.Console.WriteLine($"TickerService data: {rInt}");
            await _strongChatHubContext.Clients.All.ReceiveMessage("ticker", "" + rInt);
        }
    }

}

