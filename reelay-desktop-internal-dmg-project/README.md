# Reelay Desktop

Reelay macOS 内部测试版工程。应用内置当前 Reelay 交互原型，通过 GitHub Actions 构建未签名的 Universal DMG，兼容 Apple Silicon 与 Intel Mac。

## 上传到 GitHub

将本 ZIP 解压后，把文件夹内的全部内容上传到仓库根目录。必须保留 `.github/workflows/build-macos.yml` 的目录结构。

## 下载 DMG

1. 打开仓库的 **Actions**。
2. 进入 **Build macOS DMG**。
3. 打开最新成功的构建记录。
4. 在 **Artifacts** 下载 `Reelay-macOS-internal`。
5. 解压后获得 DMG。

## 首次打开

该版本未使用 Apple Developer 证书签名，仅用于内部测试。如果 macOS 拦截应用，请前往：

**系统设置 → 隐私与安全性 → 仍要打开**

## 本地运行

```bash
npm ci
npm start
```

## 手动触发构建

在 **Actions → Build macOS DMG → Run workflow** 中手动构建。
