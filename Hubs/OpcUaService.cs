using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Threading;

namespace webapi_signalr.Hubs
{

    public interface IOpcUaService
    {
        Task WriteMessage(string message);
    }

    public class OpcUaService : IOpcUaService
    {
        public IHubContext<TickerHub, IChatClient> _strongChatHubContext { get; }

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
            System.Console.WriteLine($"MyDependency.WriteMessage called. Message: {message}");
            await _strongChatHubContext.Clients.All.ReceiveMessage("ticker", message);
        }
    }

}

