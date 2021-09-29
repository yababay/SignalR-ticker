using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Threading;

namespace webapi_signalr.Hubs
{

    public interface IChatClient
    {
        Task ReceiveMessage(string user, string message);
    }

    public class TickerHub : Hub<IChatClient>
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.ReceiveMessage(user, message);
        }

        public Task SendMessageToCaller(string user, string message)
        {
            return Clients.Caller.ReceiveMessage(user, message);
        }
    }
}

