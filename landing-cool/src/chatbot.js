/* eslint-disable no-param-reassign */
export const widgetUrl = 'https://w-cdn.huggy.io/widget.min.js?v=7.4.2';

const launcherWidget = `(function launcherWidget (i, s, o, g, r, a, m) {
  window.$_PowerZAP = { defaultCountry: '+55', widget_id: '6609', company: '11757' };
  i[r] = { context: { id: 'da61bc9c87ba0012ca1d2b185196fee6' } };
  a = o;
  o = s.createElement(o);
  o.async = 1;
  o.src = g;
  [m] = s.getElementsByTagName(a);
  m.parentNode.insertBefore(o, m);
})(window, document, 'script', '${ widgetUrl }', 'pwz');`;

export default launcherWidget;
