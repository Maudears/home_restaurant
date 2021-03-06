//= require jquery
//= require jquery_ujs
//= require lodash
//= require bootstrap-sprockets
//= require bootstrap-datepicker
//= require moment
//= require daterangepicker
//= require admin-lte/dist/js/app.js
//= require icheck
//= require jquery.mask
//= require select2-full
//= require_tree .

$(function () {
  // Mask input
  $('input[data-money]').mask("000.000", {reverse: true});

  $("form").submit(function () {
    $(this).find('input[data-money]').unmask();
  })

  // Init i-check checkboxes
  $('input[type="checkbox"].i-check, input[type="radio"].i-check').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass: 'iradio_flat-purple'
  });

  // Active menu settings
  $(window).load(function(){
    var current_location = $(location).attr('pathname');
    $("ul.sidebar-menu > li > a").each(function() {
      $t = $(this);
      if ($t.attr('href') == current_location) {
        $t.parent().addClass('active');
      }
      else {
        $t.parent().removeClass('active');
      }
    })
  });

  // Select 2
  $.fn.select2.defaults.set('width', '70%');
  $('.select2').select2({
    theme : 'bootstrap'
  });

  // Change pagination per_page
  $('.will_paginate_per_page').change(function () {
    const $t = $(this);
    window.location.href = "?per_page=" + $t.val();
  });

  // Date range picker && init empty value
  $('.date-range').daterangepicker({
    autoUpdateInput: false,
    locale: {
      format: 'YYYY-MM-DD',
      cancelLabel: 'Clear'
    }
  });

  $('.date-range').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
  });

  $('.date-range').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });


  // Make table row into link
  $("tr[data-href]").on('click', function() {
    $('#infoModal').find('.modal-header').find('.detail').html("Category detail");
    $('#infoModal').modal('show').find('.modal-body').load($(this).data('href'));
  })
})
