import fs from "node:fs";

const products = {
  "jetsen-partner": {
    productName: "Jetsen Partner Portal",
    appId: "studio.suzy.jetsen.partner",
    url: "https://saas-release-portal.suzywang168.chatgpt.site"
  },
  "jetsen-admin": {
    productName: "Jetsen Admin Portal",
    appId: "studio.suzy.jetsen.admin",
    url: "https://frameflow-admin-portal.suzywang168.chatgpt.site"
  },
  "reelay": {
    productName: "Reelay Workspace",
    appId: "studio.suzy.reelay",
    url: "https://reelay-workspace.suzywang168.chatgpt.site"
  }
};

const key = process.argv[2];
const product = products[key];
if (!product) throw new Error("Unknown product: " + key);

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.build.productName = product.productName;
pkg.build.appId = product.appId;
pkg.build.artifactName = key + "-${version}-${os}-${arch}.${ext}";
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
fs.writeFileSync("portal-config.json", JSON.stringify({ key, ...product }, null, 2) + "\n");
