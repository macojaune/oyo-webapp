<template lang="pug">
  #app
    h1 Ò YO?
      br
      small Trouvez vos groupes !
    router-view

</template>
<script>
import { mapGetters } from 'vuex';

export default {
  created() {
  },
  data() {
    return {
      dismiss: 3,
    };
  },
  computed: {
    ...mapGetters(['success, error']),
  },
  watch: {
    success() {
      this.$bvToast.toast(this.success, { title: 'Attention !', variant: 'danger', toaster: 'b-toaster-bottom-right' });
    },
    error() {
      this.$bvToast.toast(this.error.msg, { title: 'Attention !', variant: 'danger', toaster: 'b-toaster-bottom-right' });
    },
  },
  methods: {
    countDown(count) {
      this.dismiss = count;
    },
  },
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
#alert
  z-index 2000
</style>
