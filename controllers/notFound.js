var fn_notFound = async (ctx,next) => {
    ctx.response.body = `<h1 style="margi:0 auto">404 NOT FOUND</h1>`;
};
module.exports = {
    'GET /notFound':fn_notFound
}