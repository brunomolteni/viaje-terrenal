const util = require('reshape-plugin-util')

module.exports = function yellPlugin (tree) {
  return util.modifyNodes(tree, (node) => node.name === 'img', (node) => {
    let source = node.attrs.src[0].content;
    if(source.split('.').pop().toLowerCase() === 'jpg'){
      if(node.attrs.class && node.attrs.class[0].content === 'hero-image'){
        node.attrs.src = { type: 'text', content: source+'?w=250&h=50&fm=jpg&fl=progressive&fit=fill' };
        node.attrs.srcset = {type: 'text', content: `${source}?w=500&h=100&fm=jpg&fl=progressive&fit=fill 500w, ${source}?w=1000&h=200&fm=jpg&fl=progressive&fit=fill 1000w, ${source}?w=2000&h=400&fm=jpg&fl=progressive&fit=fill 2000w`};
      }else{
        node.attrs.src = { type: 'text', content: source+'?w=250&fm=jpg&fl=progressive' };
        node.attrs.srcset = {type: 'text', content: `${source}?w=500&fm=jpg&fl=progressive 500w, ${source}?w=1000&fm=jpg&fl=progressive 1000w, ${source}?w=2000&fm=jpg&fl=progressive 2000w`};
      }
    };
    return node
  })
}
