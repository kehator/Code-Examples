(function($) {

  $( document ).ready(function() {

    if ( $('body').hasClass('page-id-24') ) {
      var target = $('.has_equal_columns_height_sliders .testimonial-text');
      equal_elements_height(target);
    }
    
    if ( $('body').hasClass('page-id-302') ) {
      free_guides_form();
    }
    

    read_more_slide_down();
    search_sorting_jobs_fix();
    search_sorting_practices_fix();
    valuation_form_fix();
    list_scroller();
    sticky_header();
    guest_form_check();
    featured_sliders();
    get_cv_name_from_input();
    job_modal_data();
    job_post_apply();
    jobs_navi_fix();
    user_form_collapse();
    select_category_fix();
    menu_dropdown();

    $('.myAlert .close-btn').on("click", function(){
      $('.myAlert').hide();
    });

    $('.myAlert').delay(3000).fadeOut(1000);

    $('#primary-menu li a').addClass('nav-link');

    $('#latest-news-home .esg-filters.esg-singlefilters').appendTo('#latest-news-home');
  });

  // function show_register_form() {
  //   let recruitment_closed = true,
  //       finance_closed = true;

  //   $('.register-section .box-recruitment button').on('click', function(e){

  //     if (finance_closed == true) {
  //       if (recruitment_closed == true) {
  //         $('#recruitment').slideDown(function(){
  //           recruitment_closed = false;        
  //         });
  //       } else {
  //         $('#recruitment').slideUp(function(){
  //           recruitment_closed = true;        
  //         });
  //       }
  //     } else {
  //       $('#finance_sales').slideUp(function(){
  //         finance_closed = true;

  //         $('#recruitment').slideDown(function(){
  //           recruitment_closed = false;        
  //         });
  //       });
  //     }
  //   });

  //   $('.register-section .box-finance-sales').on('click', function(e){
  //     if (recruitment_closed == true) {
  //       if (finance_closed == true) {
  //         $('#finance_sales').slideDown(function(){
  //           finance_closed = false;        
  //         });        
  //       } else {
  //         $('#finance_sales').slideUp(function(){
  //           finance_closed = true;        
  //         });
  //       }
  //     } else {
  //       $('#recruitment').slideUp(function(){
  //         recruitment_closed = true;

  //         $('#finance_sales').slideDown(function(){
  //           finance_closed = false;        
  //         });
  //       });
  //     }
  //   });
  // }
  

  function free_guides_form() {
    // document.cookie = "free_guides_access_granted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    var all_links = [], current_link, current_el;
    var has_cookie = getCookie("free_guides_access_granted");

    if ( ! has_cookie ) {
      $('#free-guides-list .trigger-form-btn a').each(function(el){
        all_links.push( $(this).attr('href') );
        $(this).attr("href", "#");

        $(this, el).on('click', function(e){
          current_link = $(this, el);
          current_el = el;        
          $('#modal-free-guides-form').modal('show');
        });
      });

      $('#modal-free-guides-form').on('shown.bs.modal', function () {

        $("input[name='guides_practice_owner']").on('click', function(){
          $('input[name="guides_practice_owner"]:checked').prop('checked',false);
          $(this).prop('checked',true);
        });

        $('#guides-form').on('submit', function(e){
          var guides_first_name = $("input[name='guides_first_name']").val(),
              guides_last_name = $("input[name='guides_last_name']").val(),
              guides_email = $("input[name='guides_email']").val(),
              guides_mobile = $("input[name='guides_mobile']").val(),
              guides_gdc = $("input[name='guides_gdc']").val(),
              guides_practice_owner = $("input[name='guides_practice_owner']:checked").val();

              // console.log(guides_first_name);
              // console.log(guides_last_name);
              // console.log(guides_email);
              // console.log(guides_mobile);
              // console.log(guides_gdc);
              // console.log(guides_practice_owner);

          if ( guides_first_name && guides_last_name && guides_email && guides_mobile && guides_practice_owner ) {
            current_link.attr("href", all_links[current_el]);
            $('#modal-free-guides-form').modal('hide');

            setTimeout(function(){
              $.post( "/", {
                functionName: 'add_user_free_guides', 
                free_guides_registration: 'add_user', 
                guides_first_name: guides_first_name, 
                guides_last_name: guides_last_name, 
                guides_email: guides_email,
                guides_mobile: guides_mobile,
                guides_gdc: guides_gdc,
                guides_practice_owner: guides_practice_owner
              }).success(function(response){
                      // header('Location: http://dentalelite.headred1.co.uk/free-practice-sales-guides/'); 
                location.reload();
              });
            },300);
          } else {
            return false;
          }
        });
      });
    }
  }

  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  function equal_elements_height(target) {
    var heights = [],
        min_height = 0;
    setTimeout(function (){
      target.each(function(el){
        heights.push($(this).height());
      });

      min_height = Math.max.apply(Math,heights);
      target.css('min-height', min_height);
      
    }, 250);
  }

  function read_more_slide_down() {
    $('.read-more-section .read-more-btn').on('click', function() {
      if ( $('.read-more-section .read-more-text .hidden-part').hasClass('open') ) {

        $('.read-more-section .read-more-text .hidden-part').hide();
        $('.read-more-section .read-more-btn').text('Read More');
        $('.read-more-section .read-more-text .hidden-part').removeClass('open');

      } else {

        $('.read-more-section .read-more-text .hidden-part').show();
        $('.read-more-section .read-more-btn').text('Read Less');
        $('.read-more-section .read-more-text .hidden-part').addClass('open');

      }
    });

    var has_more = $('.read-more-section .read-more-text .hidden-part').length;
    if ( ! has_more ) {
      $('.read-more-section .read-more-btn').hide();
    }
  }

  function search_sorting_jobs_fix() {
    $('#salary-sort').on('change', function(e){
      e.preventDefault;
      var new_order = $('#salary-sort').val();
      $('#jobs-search-form input[name=salary-sort]').val(new_order);
      setTimeout(function(){
        $('#jobs-search-form').submit();        
      }, 250);
    });
  }

  function search_sorting_practices_fix() {
    $('#price-sort').on('change', function(e){
      e.preventDefault;
      var new_order = $('#price-sort').val();
      $('#sales-search-form input[name=price-sort]').val(new_order);
      $('#sales-search-form').submit();
    })
  }

  function valuation_form_fix() {
    $('.free-valuation-form .next-step-btn').on('click', function(e){
      e.preventDefault;

      $('.free-valuation-form .hidden-part').slideDown(250);
      $('.free-valuation-form .next-step-btn').fadeOut(250, function(e){
        $('.free-valuation-form .next-step-col').addClass('hide');        
      });
    })
  }

  function list_scroller() {
    $(window).on('scroll', function(e) {
      e.preventDefault;
      if ($(window).scrollTop() > 200) {
          $('#interested-practices-list').addClass('fixed-top');
      }
      else {
          $('#interested-practices-list').removeClass('fixed-top');
      }
    });
  }

  function select_category_fix() {
    // fix select
    var list_width = $('.esg-dropdown-wrapper').outerWidth();
    var select_button = $('.esg-selected-filterbutton');
    select_button.css( 'width', list_width );

    // case study page
    // $('#case-study-list .esg-selected-filterbutton span').text('View All');
    // $('#case-study-list .esg-dropdown-wrapper .esg-filterbutton').on('click', function(e){
    //   e.preventDefault;
    //   $('#case-study-list .esg-selected-filterbutton span').text($(this, ' > span:last-of-type').text());
    // });

    // knowledge base page
    $('#knowledge-base .esg-selected-filterbutton span').text('View All');
    $('#knowledge-base .esg-dropdown-wrapper .esg-filterbutton').on('click', function(e){
      e.preventDefault;
      $('#knowledge-base .esg-selected-filterbutton span').text($(this, ' > span:last-of-type').text());
    });
  }

  function user_form_collapse() {
    $('.userForm .collapse-button').each(function(el){
     $(this).on('click', function(e){
       if ( $('i', this).hasClass('open') ) {
         $('i', this).removeClass('open')
       } else {
         $('i', this).addClass('open')
       }
     });
    });
  }

  function job_modal_data() {
    $('#applyFormModal').on('show.bs.modal', function (event) {
      event.preventDefault;

      var button = $(event.relatedTarget);
      var job_id = button.data('job_id');
      var job_url = button.data('job_url');
      // var back_url = button.data('back_url');
      var modal = $(this);
      modal.find('.modal-body form').attr('action', job_url);
      modal.find('.modal-body input[name="job_id"]').val(job_id);
    });

    var no_cv = $('input[name="no_cv"]').length;
    if ( no_cv == 1 ) {
      $('#file_id').on('change', function(e){
        no_cv.length = 0;
        $('input[name="no_cv"]').attr('name', 'cv-present');
        $('input[name="cv-present"]').attr('fisr_cv',true);
      });
    }

    $('#file_id, #new_cv').on('change', function () {
      var fileExtension = ['doc', 'docx', 'pages', 'pdf', 'txt', 'rtf', 'odt'];
      if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        $('input[name="wrong_file_format"]').val(1);
        alert("Only formats are allowed : "+fileExtension.join(', '));
      } else {
        $('input[name="wrong_file_format"]').val(0);
      }
    });

    $('#registerInterestModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget);
      var practice_id = button.data('practice_id');
      var title = button.data('title');
      var permalink = button.data('permalink');
      var modal = $(this);

      modal.find('.register-interest-form input[name="id"]').val(practice_id+'-interested');
      modal.find('.register-interest-form input[name="title"]').val(title);
      modal.find('.register-interest-form input[name="permalink"]').val(permalink);
      modal.find('.register-interest-form input[name="is_modal"]').val(1);
    });
  }

  function job_post_apply() {
    $('#applyFormModal form').on('submit', function(e){
      e.preventDefault();

      var jobs_url = $(this).attr('action'),
          use_new_cv = $('input[name="use-new_cv"]'),
          no_cv = $('input[name="no_cv"]'),
          cv_present = $('input[name="cv-present"]'),
          use_cv = $('input[name="use-cv"]', this).val(),
          wrong_file_format = $('input[name="wrong_file_format"]').val(),
          is_not_logged_in = $(this).data('not_logged_in');

      var enquiry = $('input[name="enquiry"]', this).val(),
          job_id = $('input[name="job_id"]', this).val(),
          personName = $('input[name="personName"]', this).val(),
          email = $('input[name="email"]', this).val(),
          number = $('input[name="number"]', this).val(),
          address = $('input[name="address"]', this).val(),            
          message = $('textarea[name="message"]', this).val(),
          errors = [],
          cv = $('#filename').val(), new_cv, filename;

        if ( use_new_cv.length == 1 ) {
          new_cv = document.getElementById("new_cv").files[0];
        }

        if (is_not_logged_in) {
          cv = document.getElementById("file_id").files[0];
        }

        if (cv_present.length == 1) {
          cv = document.getElementById("file_id").files[0];
        }

        if ( !is_not_logged_in && use_new_cv.length == 0 && no_cv.length == 0) {
          filename = $('#filename').val();
        }

        if (is_not_logged_in) {
          if ( !personName ) {
            errors['personName'] = 'missing name';
            $('.error_name').text(errors['personName']);
          } else {
            $('.error_name').text('');
          }

          if ( !email ) {
            errors['email'] = 'missing email';
            $('.error_email').text(errors['email']);
          } else {
            $('.error_email').text('');
          }

          if ( !number ) {
            errors['number'] = 'missing number';
            $('.error_number').text(errors['number']);
          } else {
            $('.error_number').text('');
          }

          if ( !address ) {
            errors['address'] = 'missing address';
            $('.error_address').text(errors['address']);
          } else {
            $('.error_address').text('');
          }

          if ( !message ) {
            errors['message'] = 'missing message';
            $('.error_message').text(errors['message']);
          } else {
            $('.error_message').text('');
          }

          if ( wrong_file_format == 1 ) {
            errors['cv_format'] = 'Wrong File Format';
            $('.error_guest_cv_format').text(errors['cv_format']);
          } else {
            $('.error_guest_cv_format').text('');
          }

          if ( !cv ) {
            errors['cv'] = 'missing cv';
            $('.error_guest_cv').text(errors['cv']);
          } else {
            $('.error_guest_cv').text('');
          }
        }

        if ( !is_not_logged_in ) {
          if ( wrong_file_format == 1 ) {
            errors['cv'] = 'Wrong File Format';
            $('.error_cv_format').text(errors['cv_format']);
          } else {
            $('.error_cv_format').text('');
          }

          if ( no_cv.length == 1 ) {
            errors['no_cv'] = 'missing cv';
            $('.error_no_cv').text(errors['no_cv']);
          } else {
            $('.error_no_cv').text('');
          }

          if ( !message ) {
            errors['message'] = 'missing message';
            $('.error_message').text(errors['message']);
          } else {
            $('.error_message').text('');
          }
        }

        var formData = new FormData();

        formData.append("enquiry", enquiry);
        formData.append("job_id", job_id);
        formData.append("personName", personName);
        formData.append("email", email);
        formData.append("number", number);
        formData.append("address", address);
        formData.append("cv", cv);
        formData.append("filename", filename);
        formData.append("message", message);
        formData.append("use-cv", use_cv);
        formData.append("new_cv", new_cv);

        if ( $.isEmptyObject(errors) == true ) {
          var request = new XMLHttpRequest();
          request.open("POST", jobs_url);
          request.send(formData);

          $('#applyFormModal form')[0].reset();
          $('#applyFormModal .errors').text('');

          setTimeout(function(){ location.reload(); }, 1000);
        }
    });
  }

  function jobs_navi_fix() {
    $('#job-list .jobs-navi .prev,#job-list .jobs-navi .next, #job-list .jobs-navi-bottom .prev,#job-list .jobs-navi-bottom .next').removeClass('page-numbers');
    $('#job-list .jobs-navi .page-numbers').wrapAll("<div class='numbers' />");
    $('#job-list .jobs-navi-bottom .page-numbers').wrapAll("<div class='numbers' />");

    setTimeout(function(){
      var dropdown_width = $('#case-study-list .esg-dropdown-wrapper').width() + 42;
      $('#case-study-list .esg-selected-filterbutton').css('width', dropdown_width);
    }, 100);
  }

  function get_cv_name_from_input() {
    $('#file_id').on('change', function(e){
      var file_name = document.getElementById("file_id").files[0].name;

      $('.selected-file-name').text(file_name);
    });

    $('#new_cv').on('change', function(e){
      var file_name = document.getElementById("new_cv").files[0].name;
      
      $('#select-cv').hide();
      $('input[name="use-cv"').attr('name', 'use-new_cv');
      $('.selected-file-name').text(file_name);
    });
  }

  function featured_sliders() {
    if ( $('body').hasClass('single-post') ) {
      $('.featured-practices').slick({
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
      });

      $('.featured-jobs-sidebar').slick({
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
      });
    } else if ( $('body').hasClass('page-id-15') ) {
      $('.featured-items-slider').slick({
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
      });
    } else if ( $('body').hasClass('page-id-24') ) {
      $('.featured-items-slider').slick({
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
      });
    } else {
      $('.featured-practices').slick({
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
      });

      $('.featured-jobs-sidebar').slick({
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
      });
    } 

    var arr = new Array(),
        max_val = 0,
        doc_width = $( document ).width(),
        line_heigth;

    if (doc_width > 765) {
      $('.featured-items-slider .slick-track').each(function(el){
        line_heigth = $(this).height() - 32;
        if (line_heigth > max_val) max_val = line_heigth;
      });

      $('.featured-items-slider .featured-wrapper').css('height', max_val);
    } else {
      $('.featured-items-slider .slick-track').each(function(el){
        line_heigth = $(this).height() - 32;
        $('.featured-wrapper', this).css('height', line_heigth);
      });
    }
  }

  function guest_form_check() {
    $('.register-interest-form').each(function(el){
      $( this ).on('submit', function(e){
        var name = $( '#guest_name', this ).val(),
            surrname = $('#guest_surrname', this ).val(),
            email = $('#guest_email', this ).val(),
            telephone = $('#guest_telephone', this ).val(),
            errors = false;

        if (name === '') {
          $( '#guest_name', this ).css('border', '1px solid red');
          errors = true;
        } else {
          $( '#guest_name', this ).css('border', 'none');
        }

        if (surrname === '') {
          $('#guest_surrname', this ).css('border', '1px solid red');
          errors = true;
        } else {
          $('#guest_surrname', this ).css('border', 'none');
        }

        if (email === '') {
          $('#guest_email', this ).css('border', '1px solid red');
          errors = true;
        } else {
          $('#guest_email', this ).css('border', 'none');
        }

        if (telephone === '') {
          $('#guest_telephone', this ).css('border', '1px solid red');
          errors = true;
        } else {
          $('#guest_telephone', this ).css('border', 'none');
        }
        
        if (errors == true) {
          return false;
        }
      });
    });
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var isMobile = false;

  function setIsMobile() {
    var screenWidth = $(window).outerWidth();
    if (screenWidth < 992) {
      isMobile = true;
    } else {
      isMobile = false;
    }
  }

  setIsMobile();  

  var setIsMobileHandler = debounce(function() {
    setIsMobile();
  }, 250);
  window.addEventListener('resize', setIsMobileHandler);

  function sticky_header() {
    if ( isMobile == false ) {

      var $header = $("#masthead"),
            $clone = $header.before($header.clone().addClass("clone"));

      $(window).on("scroll", function() {
        if ( $(this).scrollTop() > 200 ) {
          $('#masthead.clone, .custom-job-header').addClass('sticky_header container');          
          $('#masthead.clone').show();
          $('.sticky_header_wrap').addClass('active');
          $('#masthead.clone #primary-menu').addClass('container');
          $('#masthead.clone #navbarToggler').addClass('collapse');
          $('#masthead.clone #navbarToggler').removeClass('navbar-collapse');

          if ( $('body').hasClass('custom-list-page') ){
            $('#just_spacer').css('height', 144)
          }
         } else if ( $(this).scrollTop() <= 200 ) {
          $('#masthead.clone, .custom-job-header').removeClass('sticky_header container');
          $('#masthead.clone').hide();       
          $('.sticky_header_wrap').removeClass('active');
          $('#masthead.clone #primary-menu').removeClass('container');
          $('#masthead.clone #navbarToggler').removeClass('collapse');
          $('#masthead.clone #navbarToggler').removeClass('navbar-collapse');
          if ( $('body').hasClass('custom-list-page') ){
            $('#just_spacer').css('height', 0)
          }
        }

        $('.sticky-navbar-toggler').on('click', function(e){
          if ( $('body').hasClass('admin-bar') ) {
            if ( $('#navbarToggler').hasClass('show') ) {
              $('.interested-practices-list.fixed-top').css('top', 160)
            } else {
              $('.interested-practices-list.fixed-top').css('top', 220)
            }
          } else {
            if ( $('#navbarToggler').hasClass('show') ) {
              $('.interested-practices-list.fixed-top').css('top', 130)
            } else {
              $('.interested-practices-list.fixed-top').css('top', 190)
            }
          }
        });
      });
    }
  }
  var doStickyHeader = debounce(function() {
    sticky_header();
  }, 250);
  window.addEventListener('resize', doStickyHeader);

  function menu_dropdown() {
    if ( isMobile == false ) {
      $('#primary-menu .menu-item-has-children').each(function(el){
        $(this).on('mouseenter', function(e){
          $(this).addClass('hovered');
          $('.sub-menu', this).fadeIn(250).show();
        });
        $(this).on('mouseleave', function(e){
          $(this).removeClass('hovered');
          $('.sub-menu', this).fadeOut(250).hide();
        });
      })
    } else {
      $('#primary-menu .menu-item-has-children').each(function(el){
        $(this).append( "<i class='fa fa-arrow-down' aria-hidden='true'></i>" );

        $('i', this).on('click', function(e){
          $(this).parent().find('.sub-menu').slideToggle(250);
        })
      });
    }
  }

  var doMobileDropdown = debounce(function() {
    menu_dropdown();
  }, 250);
  window.addEventListener('resize', doMobileDropdown);


  // console.log(isMobile)
}(jQuery));