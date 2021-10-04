import asyncio, random
import os, time
from aiohttp import web
from collections import defaultdict
import aiohttp.web
from threading import Thread

HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 8080))
websockets = []


async def do_constantly(coro_func):
    while True:
        await coro_func()
        await asyncio.sleep(1)


async def index_handler(request):
    return web.FileResponse('./public/index.html')


async def websocket_handler(request):
    print('Websocket connection starting')

    ws = aiohttp.web.WebSocketResponse()
    await ws.prepare(request)

    async def tick():
        r = random.randint(0, 65) + 30
        await ws.send_str(str(r))

    ticker = asyncio.create_task(do_constantly(tick))
    await ticker
    return ws


def main():
    app = aiohttp.web.Application()
    app['websockets'] = defaultdict(set)
    app.router.add_route('*', '/', index_handler)
    app.router.add_route('GET', '/ws', websocket_handler)
    aiohttp.web.run_app(app, host=HOST, port=PORT)


if __name__ == '__main__':
    main()

"""
import asyncio
from collections import deque


async def do_constantly(coro_func):
    while True:
        await coro_func()


async def get_salt():
    await asyncio.sleep(1)
    print('salt')


async def get_sugar_every10_secondes():
    await asyncio.sleep(10)
    print('sugar')


async def main():
    task1 = asyncio.create_task(do_constantly(get_salt))
    task2 = asyncio.create_task(do_constantly(get_sugar_every10_secondes))


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.run_forever()  # to keep tasks spawning


import asyncio
import os, time
from aiohttp import web
from collections import defaultdict
import aiohttp.web
from threading import Thread

HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 8080))
websockets = []

async def index_handler(request):
    return web.FileResponse('./public/index.html')


async def websocket_handler(request):
    print('Websocket connection starting')

    ws = aiohttp.web.WebSocketResponse()
    await ws.prepare(request)
    websockets.append(ws)

    #print('There are ', len(app['websockets']), 'connections.')

    async for msg in ws:
        print(msg)
        if msg.type == aiohttp.WSMsgType.TEXT:
            print(msg.data)
            if msg.data == 'close':
                await ws.close()
            else:
                await ws.send_str(msg.data + '/answer')

    print('Websocket connection closed')
    return ws

async def tick():
        async for ws in websockets:
            if ws.closed:
                continue
            await ws.send_str('hi')

def ticker():
    while True:
        time.sleep(1)
        #asyncio.run(tick())
        print('ping')

def main():
    app = aiohttp.web.Application()
    app['websockets'] = defaultdict(set)
    app.router.add_route('*', '/', index_handler)
    app.router.add_route('GET', '/ws', websocket_handler)
    aiohttp.web.run_app(app, host=HOST, port=PORT)
    Thread(target=ticker()).start()


if __name__ == '__main__':
    main()


import asyncio, os, aiohttp
from collections import defaultdict
from aiohttp import web


app = web.Application()
ws = web.WebSocketResponse()
app['websockets'] = defaultdict(set)


async def tick():
    for ws in [ws for ws in app['websockets'].values() if not ws.closed]:
        n = '77'
        ws.send_str(n)
        print(n)


async def index_handler(request):
    return web.FileResponse('./public/index.html')


async def ws_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    ws.send_str('99')

app.router.add_route('*', '/', index_handler)
app.router.add_static('/', './public', show_index=True)
app.router.add_route('GET', '/ticker', ws_handler)


async def main():
    while True:
        await tick()
        await asyncio.sleep(1)



"""

if __name__ == '__main__':
    main()
