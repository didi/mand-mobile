import popup from '../../components/popup/index';
popup.install = function (Vue) {
  Vue.component(popup.name, popup);
};
export default popup;
