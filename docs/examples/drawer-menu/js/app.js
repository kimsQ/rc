// Your app's javascript, make it your own

$(document).ready(function(){
  RC_initDrawer();

  // 드로어 아이템 탭시에 드로어 숨기기 처리
  $('.snap-drawer .table-view-cell').tap(function() {
    $('#myDrawer').drawer('hide')
  });

});
