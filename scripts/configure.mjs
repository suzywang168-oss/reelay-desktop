import fs from "node:fs";

const products = {
  "dip-production": {
    productName: "Dip Production Portal",
    appId: "studio.suzy.dip.production",
    url: "https://saas-release-portal.suzywang168.chatgpt.site"
  },
  "dip-admin": {
    productName: "Dip Admin Portal",
    appId: "studio.suzy.dip.admin",
    url: "https://frameflow-admin-portal.suzywang168.chatgpt.site"
  },
  "painter": {
    productName: "Painter Workspace",
    appId: "studio.suzy.painter",
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
