export default {
  data() {
    return {
      activeTab: 'home',
    };
  },
  methods: {
    Nav_burgur() {
      const myPopup4 = new Popup({
        id: "Burger",
        title: "WOW",
        content: this.$refs.Olika_view.innerHTML,
      });
      myPopup4.show();
    },
  },
};
