import json
import websocket
import pandas as pd

coins = ['BTCUSDT', 'ETHUSDT', 'XMRUSDT'] 
coins = [coin.lower() + '@kline_3m' for coin in coins]
coins = '/'.join(coins)
print("Subscribed streams:", coins)

socket = f"wss://data-stream.binance.vision:443/ws/{coins}"


def on_message(ws, msg):
    # Parse the JSON message
    msg = json.loads(msg)

    symbol = msg['s'] if 's' in msg else "Unknown"
    kline = msg.get('k', {})

    if kline:
        close_price = kline.get('c')  # Closing price
        end_time = kline.get('T')     # Timestamp
        is_final = kline.get('x')     # Whether this is the final update for the candle

        print(f"Symbol: {symbol}, Close Price: {close_price}, Final: {is_final}")

ws = websocket.WebSocketApp(socket, on_message=on_message) 
ws.run_forever()

