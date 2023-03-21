const http = require("http")

http.createServer((req, res) => {
    // レスポンスヘッダーを設定
    res.writeHead(200, {
        "Content-Type": "text/event-stream", // レスポンスタイプをSSEに設定
        "Cache-Control": "no-cache", // キャッシュを無効化
        Connection: "keep-alive", // 接続を維持
    })

    let count = 0
    const intervalId = setInterval(() => {
        count++
        res.write(`data: ${count}\n\n`) // SSE形式でデータを送信
    }, 1000)

    // クライアントからの接続が切れたら処理を停止
    req.socket.on("close", () => {
        clearInterval(intervalId)
        console.log("Client closed connection.")
    })
}).listen(5000)

console.log("Server running at http://localhost:5000/")

// acees to http://localhost:5000/
