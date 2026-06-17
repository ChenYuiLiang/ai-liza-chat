# AI Liza · Live Chat

即時對話的 AI Liza（網頁版）。聽（瀏覽器語音辨識）→ 想（你的 LLM）→ 說（ElevenLabs 的 Liza 聲音）→ 臉（會說話的影片）。中英雙語。

純靜態網頁，可直接放上 **GitHub Pages**。所有 API 金鑰由使用者在頁面自行輸入、只存在自己的瀏覽器（localStorage），程式碼中**不含任何金鑰**。

## 上 GitHub Pages

1. 把這個資料夾推到一個**公開**的 GitHub repo（免費帳號的 Pages 需要 public repo）。
2. repo → **Settings → Pages** → Source 選 **Deploy from a branch** → 分支選 `main`、資料夾 `/ (root)` → Save。
3. 等 1–2 分鐘，會得到網址 `https://<帳號>.github.io/<repo>/`，用 **Chrome** 開即可。

## 使用

開頁面後在「設定」填：
- **LLM**：Anthropic（模型用 `claude-3-5-haiku-20241022`）、或 OpenAI（`gpt-4o-mini`）、或 Gemini（需有免費額度的 AI Studio key）。貼上你的 API key。
- **ElevenLabs**：貼上有效金鑰（權限含 Voices:Read、User:Read、Text to Speech:Access），按「載入聲音」選 **Liza EN**。
- 按「儲存並開始對話」，允許麥克風，點 🎤 說話或打字。

## 說明與限制

- 金鑰只存在你的瀏覽器，不會上傳到 repo 或任何第三方。
- **臉是近似對嘴**：講話時播放預錄影片，非逐字精準同步。要真‧即時逐字對嘴需接 HeyGen LiveAvatar 串流 API。
- 建議用 **Chrome**（語音辨識最穩，瀏覽器直連 LLM 的 CORS 也最寬鬆）。
- 這是原型；金鑰請用可限額或可隨時撤銷的測試 key。

## 檔案
- `index.html` — 主程式
- `liza_face2.mp4` — 講話時播放的臉（壓縮版）
- `liza_idle.jpg` — 待機靜像
