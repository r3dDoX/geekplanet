module.exports = {
  handleRoute(router, req, res) {
    return new Promise((resolve) => {
      router.handle(req, res, () => {
        resolve();
      });
    });
  },
};

