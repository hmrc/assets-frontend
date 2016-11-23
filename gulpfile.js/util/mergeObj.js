module.exports = function (parent, child) {
  Object.keys(child).forEach(function (prop) {
    if (child.hasOwnProperty(prop)) {
      parent[prop] = child[prop];
    }
  });

  return parent;
};
