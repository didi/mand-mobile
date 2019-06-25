import transition from '../../components/transition/index';
transition.install = function (Vue) {
  Vue.component(transition.name, transition);
};
export default transition;
