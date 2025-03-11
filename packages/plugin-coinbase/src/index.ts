import { coinbaseMassPaymentsPlugin } from "./plugins/massPayments";
import { coinbaseCommercePlugin } from "./plugins/commerce";
import { tradePlugin } from "./plugins/trade";
import { tokenContractPlugin } from "./plugins/tokenContract";
import { webhookPlugin } from "./plugins/webhooks";
import { advancedTradePlugin } from "./plugins/advancedTrade";

// Export individual plugins directly
export { 
  coinbaseMassPaymentsPlugin,
  coinbaseCommercePlugin,
  tradePlugin,
  tokenContractPlugin,
  webhookPlugin,
  advancedTradePlugin
};

export const plugins = {
  coinbaseMassPaymentsPlugin,
  coinbaseCommercePlugin,
  tradePlugin,
  tokenContractPlugin,
  webhookPlugin,
  advancedTradePlugin,
};

export const mergedPlugins = {
  name: "coinbase",
  description: "Coinbase plugin. Enables various functionalities using the Coinbase SDK.",
  actions: Object.values(plugins)
    .map((plugin) => plugin.actions)
    .filter(Boolean)
    .flat(),
  providers: Object.values(plugins)
    .map((plugin) => plugin.providers)
    .filter(Boolean)
    .flat(),
  evaluators: Object.values(plugins)
    .map((plugin) => plugin.evaluators)
    .filter(Boolean)
    .flat(),
  services: Object.values(plugins)
    .map((plugin) => plugin.services)
    .filter(Boolean)
    .flat(),
};

export default mergedPlugins;