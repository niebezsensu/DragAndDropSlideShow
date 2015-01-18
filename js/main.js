 var a = 3;

 $(function() {

    $(".im").draggable({
   drag: function(event, ui){
    $(this).css('z-index', ++a);
   }
   
  });

  $(".placeholder").droppable({
   drop: function(event, ui) {


    var top = $(this).offset().top;
    var left = $(this).offset().left;


    if ($(this).children().length > 0) {
     $(ui.draggable[0]).css('top', (parseInt($(ui.draggable[0]).css('top'), 10)-170)+'px');
     return false;
    }


    $(ui.draggable[0]).attr('style', '');
    $(ui.draggable[0]).appendTo($(this))
    $(ui.draggable[0]).one('mousedown', function() {
     $(this).css('top', top);
     $(this).css('left', left);
     $(this).appendTo($('.temp'))
    })
    $(ui.draggable[0]).one('mouseup', function() {
     $(this).draggable();
    })

   }
  });
  
 $('#go').on('click', function() {
  
    if($('.gallery').children().length === 0){
   return;
  }
  
  
   $( ".placeground" ).fadeOut(500, function() {
    // Animation complete.
    
    $('.placeholder').each(function() {
     if($(this).children().length > 0) {
      var html = $(this).html();
      $('.gallery').append(html);
      $('.gallery img').hide();
     }
    });
    
    $('.gallery img').first().addClass('next');
    
    $('.gallery').show();
    
    $('#go').hide();
    $('#back').show();
    
  });
 })
 $('#back').on('click', function() {
  $('.gallery').html('');
  $('.gallery').hide();
  $( ".placeground" ).fadeIn(500);
  $('#back').hide();
    $('#go').show();
 });
 
 setInterval(function(){ 
  $('.gallery').find('.next').fadeIn(1000, function() {
   $(this).fadeOut(1000, function() {
     console.log($('.gallery').find('.next').next());
     if($('.gallery').find('.next').next().length > 0) {
      $('.gallery').find('.next').removeClass('next').next().addClass('next'); 
     } else {
      $('.gallery').find('.next').removeClass('next');
      $('.gallery img').first().addClass('next');
     }
       
   })
  });
  
 }, 3000);
 });
