export default (req) => {
    $(`.sidebar-menu a[href='#${req.url}']`).parent().addClass('active').siblings().removeClass('active')
}