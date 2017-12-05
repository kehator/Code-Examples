<?php 

/**
 * [get_response_from_google to fetch langtitude and longtitude from google using address(addres, postcode)]
 * @param  [string] $address [provide address for google localization service]
 * @return [array]          [langtitude and longtiture]
 */
function get_response_from_google($address) {
  $address = strtolower(str_replace(' ', '+', $address));

  $url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $address . '&key=%_key_';
  $curl = curl_init();

  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_RETURNTRANSFER,1); 

  $response = json_decode(curl_exec($curl));
  $error = curl_error($curl);
  curl_close($curl);

  if ( $error || $response == null ) {
    return $error;
  }

  return $response;
}

/**
 * [get_jobs_posts pre-getting post types in wordpress to display 'job-type' posts on specific page]
 * @param  [array] &$query [wordpress query]
 * @return [array]         [array of filtered posts]
 */
function get_jobs_posts(&$query)
{
    global $wp_query, $paged, $wp, $wpdb;

    $meta_query_array = array('relation' => 'AND');

    $paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
    if ($query->is_main_query() && is_archive() && ($wp->request == 'jobs' || $wp->request == 'jobs/page/' . $paged)) {
        $query->set('post_type', 'job');
        $query->set('posts_per_page', get_option('posts_per_page'));
        $query->set('paged', $paged);
        
        if (isset($_GET['selectSalaryRange']) && !empty($_GET['selectSalaryRange'])) {
            $salaryRange = $_GET['selectSalaryRange'];
            $salaryRange = explode("-", $salaryRange);
            $min_salary = (int)$salaryRange[0];
            $max_salary = (int)$salaryRange[1];


            if ($min_salary > 0) {
                $selectMinRange = array(
                    'key' => 'min_salary',
                    'value' => $min_salary,
                    'compare' => '>=',
                    'type'  => 'NUMERIC',
                );

                array_push($meta_query_array, $selectMinRange);
            }

            if ($max_salary > 0) {
                $selectMaxRange = array(
                    'key' => 'max_salary',
                    'value' => $max_salary,
                    'compare' => '<=', 
                    'type'  => 'NUMERIC',
                );
                array_push($meta_query_array, $selectMaxRange);
            }
        }
        
        // if (isset($_GET['salary-sort']) && !empty($_GET['salary-sort'])) {
        //     $query->set('orderby', 'meta_value');
        //     $query->set('meta_key', 'salary');
        //     $query->set('order', strtoupper($_GET['salary-sort']));
        // }

        if (isset($_GET['selectType']) && !empty($_GET['selectType'])) {
            $query->set('title', $_GET['selectType']);
        }
        //print_r($meta_query_array);
        $query->set('meta_query', $meta_query_array);
    }

    wp_reset_postdata();
    //print_r($query);
    return $query;
}
add_filter( 'pre_get_posts', 'get_jobs_posts', 1 );

/**
 * [contact_us_map set google map shortcode with marker, centered on specific localization]
 * @return [html] [return as shortcode to put in wordpress template]
 */
function contact_us_map() {
    $html_code = '
    <div id="map"></div>
    <script>
      function initMap() {
        var DentalElite = {lat: 52.371245, lng: -1.266441};

        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 17,
          center: DentalElite,
          scrollwheel: false,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { saturation: -100 }
              ]
            }
          ]
        });

        var marker = new google.maps.Marker({
          position: DentalElite,
          map: map,
          icon: "/wp-content/themes/dentalelite/images/marker.png"
        });
      }
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=_key_&callback=initMap"></script>';
    return $html_code;
}
add_shortcode( 'custom-google-map', 'contact_us_map' );
