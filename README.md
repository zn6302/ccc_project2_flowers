# Interactive Flowers｜互動花園

一件使用 p5.js 製作的互動生成花園。每次開啟頁面時，程式會長出不同花型、尺寸、顏色與莖長；游標靠近花朵時，花莖會像受到風或觸碰般彎曲，再以彈性動態慢慢回到原位。

[觀看 GitHub Pages](https://zn6302.github.io/ccc_project2_flowers/)

## 互動方式

- 移動游標靠近花朵，觀察花朵向兩側擺動。
- 點擊畫布可重新長出一座花園。
- 每朵花的花型、花瓣比例、莖長與配色都由程式隨機生成。

## 視覺設計

作品以乾燥花束為配色方向，使用粉藍、棉花白、米白、藕紫與低彩度綠色。花朵分布採黃金角排列，再加入少量隨機偏移，使花叢同時保有自然感與均衡密度。

目前包含六種花型：

1. 放射狀橢圓花瓣
2. 雙層圓形花瓣
3. 大型圓瓣與放射花蕊
4. 線性花蕊與端點花苞
5. 動態 spline 花瓣
6. 雲霧狀滿天星

## 技術

- JavaScript
- [p5.js 2.2.3](https://p5js.org/)
- GitHub Pages
- 純靜態網站，不需要建置工具

## 專案結構

```text
.
├── .github/workflows/static.yml
├── css/
│   └── style.css
├── js/
│   ├── flower.js
│   ├── palettes.js
│   └── soil.js
├── index.html
├── sketch.js
└── README.md
```

## 本機執行

```bash
python3 -m http.server 8000
```

接著開啟 `http://localhost:8000`。

## 整理說明

原 repo 同時保留根目錄與 `L3-flower/` 兩套專案，但根目錄缺少實際引用的 `js/` 與 `css/` 檔案，導致 GitHub Pages 入口無法正常載入作品。此版本將正式作品統一放在根目錄、移除重複副本，並改用 CDN 載入 p5.js。
