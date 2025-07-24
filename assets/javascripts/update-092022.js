$(document).on('click', '.dog-player .dog', function() {
  $(this).closest('.music-embed').find('.music')[0].play();
});

$(document).on('click', '.dog-player .dog-playing', function() {
  $(this).closest('.music-embed').find('.music')[0].pause();
});

$('.music').each(function() {
  $(this)[0].addEventListener('play', function() {
    $('.dog-player.playing').each(function() {
      $(this).find('.music')[0].pause();
    });
    $('.video.playing').each(function() {
      $(this)[0].pause();
    });
    $(this).closest('.dog-player').addClass('playing');
  });
  $(this)[0].addEventListener('pause', function() {
    $(this).closest('.dog-player').removeClass('playing');
  });
});

$('.video').each(function() {
  $(this)[0].addEventListener('play', function() {
    $('.dog-player.playing').each(function() {
      $(this).find('.music')[0].pause();
    });
    $(this).addClass('playing');
  });
  $(this)[0].addEventListener('pause', function() {
    $(this).removeClass('playing');
  });
});
