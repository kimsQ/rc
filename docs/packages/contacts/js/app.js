// Your app's javascript, make it your own
$('.content').on('up.rc.scroll', function() {
  $('#search-bar').addClass('affix animated fadeInDown')
})
$('.content').on('down.rc.scroll', function() {
  $('#search-bar').removeClass('affix animated fadeInDown')
})
$('.content').on('default.rc.scroll', function() {
  $('#search-bar').removeClass('affix animated fadeInDown')
})
