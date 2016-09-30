// Your app's javascript, make it your own

$(document).ready(function(){

  // 드로어 익스텐션 초기화
  snapper = new Snap({
    element: $("#myDrawer")[0],
    maxPosition: 1,
    minPosition: -1,
    transitionSpeed: 0.1,
  })

  // Initialize drawer
  RC_initDrawer();

});
