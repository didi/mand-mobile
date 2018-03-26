export default function(name = '', demos = []) {
  return {
    name: `${name}-demo`,
    data() {
      return {
        demos,
      }
    },
  }
}
