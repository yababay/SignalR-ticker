import os, random, asyncio
from aiohttp import web

HOST = os.getenv('HOST', 'localhost')
PORT = int(os.getenv('PORT', 8080))


async def index_handler(request):
    return web.FileResponse('./public/index.html')


async def websocket_handler(request):
    print('Websocket connection starting')

    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async def tick():
        while True:
            r = random.randint(0, 65) + 30
            await ws.send_str(str(r))
            await asyncio.sleep(1)

    await asyncio.create_task(tick())
    return ws


def main():
    app = web.Application()
    app.router.add_route('*', '/', index_handler)
    app.router.add_route('GET', '/ticker', websocket_handler)
    app.router.add_static('/', './public', show_index=True)
    web.run_app(app, host=HOST, port=PORT)


if __name__ == '__main__':
    main()
