<template>
  <div
    ref="root"
    class="liquid-quick-exchange-widget"
  />
</template>

<script>
export default {
  name: 'liquid-quick-exchange-widget',
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (!window.LiquidQex) {
      const script = document.createElement('script');
      script.src = 'https://partners.liquid.com/static/liquid-qex-widget/index.umd.js';
      script.onload = this.init;
      document.body.appendChild(script);
    } else {
      this.init();
    }
  },
  methods: {
    onSuccess(transaction) {
      this.$emit('success', transaction);
    },
    onError(errors) {
      this.$emit('error', errors);
    },
    init() {
      const qexPlugin = new window.LiquidQex.QexWidgetApi(this.$refs.root);
      const options = {
        public_api_key: this.apiKey,
        funding_settlement: {
          currency: 'USD',
        },
        payout_settlement: {
          method: 'BLOCKCHAIN_TRANSFER',
          currency: 'LIKE',
          quantity: '10000',
        },
        custom_styles: {
          'cs-base': {
            color: '#f7f7f7',
          },
          'cs-subtext': {
            color: '#a9c1c5',
          },
          'cs-special': {
            background: '#f7f7f7',
            color: '#4a4a4a',
            'border-color': '#e8e8e8',
          },
          'cs-error': {
            color: '#e35050',
            'border-color': '#e35050',
          },
          'cs-button': {
            color: '#28646e',
            background: '#9CEFE1',
          },
          'cs-select': {
            background: '#fff',
            color: '#28646e',
          },
          'cs-interactive': {
            color: '#28646e',
          },
          'cs-highlight': {
            color: '#28646e',
            background: '#aaf1e7',
          },
        },
      };
      if (this.walletAddress) {
        options.payout_settlement.input_parameters = {
          account_key: {
            type: 'WALLET_ADDRESS',
            value: this.walletAddress,
          },
        };
      }
      qexPlugin.init(options);
      qexPlugin.onSuccess(this.onSuccess);
      qexPlugin.onError(this.onError);
    },
  },
};
</script>

<style lang="scss">
.liquid-quick-exchange-widget {
  overflow: hidden;

  width: 100%;
  min-width: 300px;
  max-width: 320px;

  border-radius: 16px;

  background: rgb(20, 52, 58);
}
</style>
