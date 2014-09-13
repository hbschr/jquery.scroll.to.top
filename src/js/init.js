$(function () {

  var content,
      row,
      i,
      j;

  content = [];
  for (i = 0; i < 100; i++) {
    row = ['<tr>'];
    for (j = 0; j < 20; j++) {
      row.push([
        '<td>',
        '<button>' + j + ',\xa0' + i + '</button>',
        '</td>',
      ].join(''));
    }
    content.push(row.concat(['</tr>']).join(''));
  }
  
  $('table').html( content.join('') );

  $('button').on('click', function () {
    $(this).scrollToTop();
  });

});
