/**
 *
 * jspsych-visual-array-stimuli(stripts of different orientatins)
 * Hui Men
 * University of Marburg
 * 05.10.2022
 *
 * Display strips of two part with different orientation, one of the parts is covered by a rectangle occluder
 *
 **/

jsPsych.plugins["visual-array-stimuli"] = (function() {

var plugin = {};

jsPsych.pluginAPI.registerPreload('visual-array-stimuli', 'target', 'image');
jsPsych.pluginAPI.registerPreload('visual-array-stimuli', 'foil', 'image');
jsPsych.pluginAPI.registerPreload('visual-array-stimuli', 'fixation_image', 'image');

plugin.info = {
  name: 'visual-array-stimuli',
  description: '',
  parameters: {
    trial_duration: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Trial duration',
      default: 250,
      description: 'The maximum duration to wait for a response.'
    },
    condition:{
      type: jsPsych.plugins.parameterType.INT,
    },
    occ_num: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Occlusion shape',
        default: 250,
        description: 'The maximum duration to wait for a response.'
      },
    occ_pos: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'position of the occluder',
      default: 1, // 1: left; 2: right
      description: 'The maximum duration to wait for a response.'
    },
    occ_proportion: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'position of the occluder',
      default: 0.5, // 
      description: 'The maximum duration to wait for a response.'
    },
    block_num: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'position of the occluder',
      default: 1, // 
      description: 'The maximum duration to wait for a response.'
    },
    dist: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'position of the occluder',
      default: 90, // 
      description: 'The maximum duration to wait for a response.'
    },
  }
}

plugin.trial = function(display_element, trial) {

  //// -------- DEFINE PAPER SIZE --------- ////
  
  var control_frac = trial.occ_proportion;
  
  
  var stimuli_gap = 20;
  var num_height = 20; // rows of stripes  
  var num_width = 20 * 2 ; // columns of stripes
  
  
  var num_singlewidth = Math.floor(num_width*0.5);
  var stripe_length = 10; // length of the stripe
  
  var paper_width = num_width * stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 60;  
  var paper_height = num_height * stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 150;
  
  var paper_width_large = num_width * stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 100;  
  var paper_height_large = num_height * stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 100;
  
  var pos_paper_top = 0;//- 0.5*Math.sqrt(2)*stripe_length + 10;  
  var pos_paper_left = 0 ;//- 0.5*Math.sqrt(2)*stripe_length + 10; 
  var pos_paper_left_2 = 0;
  
  var plategap = 10;
  var platemargin = 10;
  var platewidth =  paper_width*0.5 - plategap - platemargin; //;+20;
  var plateheight = paper_height - 140;
  
  var platepos = platemargin;
  var platepos2 = paper_width - platewidth  - platemargin;
  
  var platey = 60;
  
  if (trial.block_num == 4){
    var platewidth2 = platewidth*control_frac;
    var num_singlewidth2 = Math.floor(num_width*0.5  * control_frac);
    //var platepos2 = platepos2+platewidth*0.5 - platewidth2*0.5;
  }
  
  /// **********************setting the square matrix**********************************///
  //// default settings: stripe matrix: occluded part(0) first, then visible part(1)
  
  var p_occ = trial.occ_proportion ; // proportion of occluded area
  var p_vis = 1-p_occ; // proportion of visibla area
  
  
  
  
  var cont = -1;
  var cont2 = -1;
  var pos_x = [];
  var pos_x2 = [];
  var pos_y = [];
  var pos_y2 = [];
  var circlemat = [];
  var circlemat2 = [];
  
  var cont_o = -1;
  var cont_v = -1;
  
  //if (trial.occ_pos == 1){ // occluder on the left
   
  var rightpartial = 0;
  if (trial.block_num == 4){
    if (Math.random() < 0.5){
      var rightpartial = 1;
      // left part full size
      for(let i = 0; i < num_height; i++) {
          circlemat[i] = [];
          for(let j = 0; j < num_singlewidth; j++) { // occluded part (0)
              cont = cont + 1;
              cont_v = cont_v + 1;
              circlemat[i][j] = 0;
              pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 70; //0.5*Math.sqrt(2)*stripe_length +
              pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 15; // left part 
        }
      }
      // right part partial size
      for(let i = 0; i < num_height; i++) {
          circlemat2[i] = [];
          for(let j = 0; j < num_singlewidth2; j++) { // occluded part (0)
              cont2 = cont2 + 1;
              cont_o = cont_o +1;
              circlemat2[i][j] = 0;
              pos_y2[cont2] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 70; //0.5*Math.sqrt(2)*stripe_length 
              pos_x2[cont2] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 15 + platewidth + plategap + platemargin; // right part
          }
      }
    }else{ // left partial size
      for(let i = 0; i < num_height; i++) {
          circlemat[i] = [];
          for(let j = 0; j < num_singlewidth2; j++) { // occluded part (0)
              cont = cont + 1;
              cont_o = cont_o + 1;
              circlemat[i][j] = 0;
              pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 70; //0.5*Math.sqrt(2)*stripe_length +
              pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 15; // left part 
        }
      }
      // right part full size
      for(let i = 0; i < num_height; i++) {
          circlemat2[i] = [];
          for(let j = 0; j < num_singlewidth; j++) { // occluded part (0)
              cont2 = cont2 + 1;
              cont_v = cont_v +1;
              circlemat2[i][j] = 0;
              pos_y2[cont2] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 70; //0.5*Math.sqrt(2)*stripe_length 
              pos_x2[cont2] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 15 + platewidth + plategap + platemargin; // right part
          }
      }
    }
    
  }else{ // block 1-3
    for(let i = 0; i < num_height; i++) {
        circlemat[i] = [];
        for(let j = 0; j < num_singlewidth; j++) { // occluded part (0)
            cont = cont + 1;
            cont_o = cont_o +1;
            cont_v = cont_v + 1;
            circlemat[i][j] = 0;
            pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 70; //0.5*Math.sqrt(2)*stripe_length +
            pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 15; // left part 
  
            pos_x2[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 15 + platewidth + plategap + platemargin; // right part
        }
    }
  }
  

  ///*******************determin the orientations of two parts**************************///

  var deg_center = Math.floor(Math.random() * (126-55) + 55); // 45 -135

  var deg_dist = trial.dist; 
  if (Math.random() < 0.5){
    var mean_occ = deg_center - 0.5*deg_dist;
    var mean_vis = deg_center + 0.5*deg_dist;
  }else{
    var mean_occ = deg_center + 0.5*deg_dist;
    var mean_vis = deg_center - 0.5*deg_dist;
  }
  
  // --- 
  var stddev = 10; // --- std of the Gaussian distribution of degrees
  var list_vis=[];
  for(var n = 0; n<= cont_v; n++){
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      list_vis.push(z0 * stddev + mean_vis)
  }
  
  var list_occ=[];
  for(var n = 0; n<=cont_o; n++){
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      list_occ.push(z0 * stddev + mean_occ)
  }
  
// -- determine the variantion of the stipe location
  var var_min_x = -3; var var_max_x = 3;
  var var_min_y = -3; var var_max_y = 3;

  var adjust_min = -2; var adjust_max = 2;

  ///******************************************************************///         
  ///******************************************************************///
  ///*****************DIESPLAY THE STIMULI*****************************///
  
  
if (trial.block_num == 4){
  display_element.innerHTML += '<div id="jspsych-visual-search-circle-container" style= "position: relative; width:' + paper_width + 'px; height:' + paper_height + 'px; top:'+ pos_paper_top + 'px; left:' + pos_paper_left + 'px;"></div>';
   
  var paper = display_element.querySelector("#jspsych-visual-search-circle-container");
  
  show_search_array();

  function show_search_array(){
    // --- randonmize the orientations --- // 
    var rand_vis = jsPsych.randomization.sampleWithoutReplacement(list_vis,list_vis.length) ;
    var rand_occ = jsPsych.randomization.sampleWithoutReplacement(list_occ,list_occ.length) ;
  
    // --- determine the striipes --- //
    var lines = '';
    var lines2 = '';
    var conts = -1;
    var conts2 = -1;
  
  // left full, right partial
     if  (rightpartial ==1){
     // --- left part
        for (var i = 0 ; i< num_height;  i++){
          for (var j = 0 ; j< num_singlewidth;  j++){
            conts = conts+1;
            var aa = rand_vis[conts];          
            var p = Math.tan((aa * Math.PI) / 180);    
            if (aa>85 && aa<100){
              var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
            }
            var xx1 = pos_x[conts] +  Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the left part
            var yy1 = pos_y[conts] +  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            if (aa >= 90){
              var yy1 = pos_y[conts] + Math.sqrt(2)*0.5*stripe_length +  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            }
           // var p = rand_vis[conts]; // left: vis
            var xx2 = xx1  + stripe_length/Math.sqrt(p**2 + 1) ;
            var yy2 = yy1 + (stripe_length*p)/Math.sqrt(p**2 + 1) ;   
            var lines = lines + '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(0,0,0);stroke-width:2" />';  
            }    
        }
    //--- right part: occ
        for (var i = 0 ; i< num_height;  i++){
          for (var j = 0 ; j< num_singlewidth2;  j++){
            conts2 = conts2+1;
            var aa2 = rand_occ[conts2];
            var p2= Math.tan((aa2 * Math.PI) / 180);
            if (aa2>85 && aa2<100){
              var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
            }
            var xx12 = pos_x2[conts2] +  Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the right part
            var yy12 = pos_y2[conts2] +  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            if (aa2 >= 90){
              var yy12 = pos_y2[conts2] + Math.sqrt(2)*0.5*stripe_length+  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            }
           // var p2 = rand_occ[conts2]; 
            var xx22 = xx12 + stripe_length/Math.sqrt(p2**2 + 1) ;
            var yy22 = yy12 + (stripe_length*p2)/Math.sqrt(p2**2 + 1);    
            var lines2 = lines2 + '<line x1="'+xx12+'" y1="'+yy12+'" x2="'+xx22+'" y2="'+yy22+'" style="stroke:rgb(0,0,0);stroke-width:2" />';
          }    
        }
     }else{// left partial, right full
      for (var i = 0 ; i< num_height;  i++){
          for (var j = 0 ; j< num_singlewidth2;  j++){
            conts = conts+1;
            var aa = rand_occ[conts];
            var p = Math.tan((aa * Math.PI) / 180);
            if (aa>85 && aa<100){
              var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
            }
            var xx1 = pos_x[conts] + platewidth  - platewidth2 +  Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the left part
            var yy1 = pos_y[conts] +  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            if (aa>=90){
              var yy1 = pos_y[conts] + Math.sqrt(2)*0.5*stripe_length +  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            }
            //var p = rand_occ[conts]; // left: vis
            var xx2 = xx1  + stripe_length/Math.sqrt(p**2 + 1) ;
            var yy2 = yy1 + (stripe_length*p)/Math.sqrt(p**2 + 1) ;   
            var lines = lines + '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(0,0,0);stroke-width:2" />';  
            }    
        }
    //--- right part
        for (var i = 0 ; i< num_height;  i++){
          for (var j = 0 ; j< num_singlewidth;  j++){
            conts2 = conts2+1;
            var aa2 = rand_vis[conts2];
            var p2= Math.tan((aa2 * Math.PI) / 180);
            if (aa2>85 && aa2<100){
              var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
            }
            var xx12 = pos_x2[conts2] +  Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the right part
            var yy12 = pos_y2[conts2] +  Math.random() * (var_max_y - var_min_y) + var_min_y;   
            if(aa2>=90){
              var yy12 =  pos_y2[conts2] + Math.sqrt(2)*0.5*stripe_length +  Math.random() * (var_max_y - var_min_y) + var_min_y; 
            }
            //var p2 = rand_vis[conts2]; // right: occ
            var xx22 = xx12 + stripe_length/Math.sqrt(p2**2 + 1) ;
            var yy22 = yy12 + (stripe_length*p2)/Math.sqrt(p2**2 + 1);    
            var lines2 = lines2 + '<line x1="'+xx12+'" y1="'+yy12+'" x2="'+xx22+'" y2="'+yy22+'" style="stroke:rgb(0,0,0);stroke-width:2" />';
          }    
        }
     }

     console.log('center: '+ deg_center)
     console.log('dist: ' + deg_dist)
     console.log('occ: '+ mean_occ)
     console.log('vis: '+ mean_vis)

   
  if (rightpartial != 1){ //left partial, right full
     var tmp = platewidth;
     platewidth = platewidth2;
     platewidth2 = tmp;
     platepos = platemargin+ platewidth2  - platewidth;
  }
  
  
      paper.innerHTML = '<div class = "backleft">\
      <svg height="'+paper_height +'" width="'+paper_width_large+'" >\
           <defs>\
            <filter id="shadowdown1" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
            </filter>\
          </defs>\
      <rect x="'+platepos+'" y="'+platey+'" width="'+platewidth +'" height="'+plateheight+'"  fill = "white" filter= "url(#shadowdown1)" />\
     '+lines+'\
      <rect x="'+platepos2+'" y="'+platey+'" width="'+platewidth2 +'" height="'+plateheight+'"  fill = "white" filter= "url(#shadowdown1)" />\
     '+lines2+'\
          <defs>\
            <filter id="shadowdown" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
            </filter>\
          </defs>\
      </svg>\
    </div>';
  
      var start_time = Date.now();
  
    
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          clear_display();
          end_trial();
        }, trial.trial_duration);
      }
  
  
      function clear_display() {
          display_element.innerHTML = '';
        }
}

}else{
  display_element.innerHTML += '<div id="jspsych-visual-search-circle-container" style= "position: relative; width:' + paper_width + 'px; height:' + paper_height + 'px; top:'+ pos_paper_top + 'px; left:' + pos_paper_left + 'px;"></div>';
   
  var paper = display_element.querySelector("#jspsych-visual-search-circle-container");
  
  show_search_array();
  function show_search_array(){
    // --- randonmize the orientations --- // 
    var rand_vis = jsPsych.randomization.sampleWithoutReplacement(list_vis,list_vis.length) ;
    var rand_occ = jsPsych.randomization.sampleWithoutReplacement(list_occ,list_occ.length) ;
  
    // --- determine the striipes --- //
    var lines = '';
    var lines2 = '';
    var conts = -1;
    var conts2 = -1;
  
 // block 1-3
    if (trial.occ_pos == 1) { // vis : left, occ: right
      for (var i = 0 ; i< num_height;  i++){
        for (var j = 0 ; j< num_singlewidth;  j++){
          conts = conts+1;
          //var p = rand_vis[conts]; // left: vis
          var aa = rand_vis[conts];
          var p = Math.tan((aa * Math.PI) / 180);
          if (aa>80 && aa < 100){
            var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
          }
          var xx1 = pos_x[conts] ;//+  Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the left part
          var yy1 = pos_y[conts] ;//+  Math.random() * (var_max_y - var_min_y) + var_min_y;   
          if (aa>90){
            var yy1 = pos_y[conts] + Math.sqrt(2)*0.5*stripe_length + Math.random() * (var_max_y - var_min_y) + var_min_y;      
          }
          var xx2 = xx1  + stripe_length/Math.sqrt(p**2 + 1) ;
          var yy2 = yy1 + (stripe_length*p)/Math.sqrt(p**2 + 1) ;
          
          var lines = lines + '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(0,0,0);stroke-width:2" />';  
          //var p2 = rand_occ[conts]; // right: occ
          var aa2 = rand_occ[conts];
          var p2= Math.tan((aa2 * Math.PI) / 180);
          if (aa2>80 && aa2<100){
            var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
          }
          var xx12 = pos_x2[conts] +  Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the right part
          var yy12 = pos_y[conts] +  Math.random() * (var_max_y - var_min_y) + var_min_y;  
          if (aa2>90){
            var yy12 = pos_y[conts] + Math.sqrt(2)*0.5*stripe_length +  Math.random() * (var_max_y - var_min_y) + var_min_y;      
          }
          var xx22 = xx12 + stripe_length/Math.sqrt(p2**2 + 1) ;
          var yy22 = yy12 + (stripe_length*p2)/Math.sqrt(p2**2 + 1);
          
          var lines2 = lines2 + '<line x1="'+xx12+'" y1="'+yy12+'" x2="'+xx22+'" y2="'+yy22+'" style="stroke:rgb(0,0,0);stroke-width:2" />';
        }    
      }
    }else if (trial.occ_pos == 2) { // occ:left, vis:right
      for (var i = 0 ; i< num_height;  i++){
        for (var j = 0 ; j< num_singlewidth;  j++){
          conts = conts+1;
          var aa = rand_occ[conts];
          var p = Math.tan((aa * Math.PI) / 180);
          if (aa>80 && aa < 100){
            var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
          }
          var xx1 = pos_x[conts] + Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the left part
          var yy1 = pos_y[conts] + Math.random() * (var_max_y - var_min_y) + var_min_y;   
          if (aa>90){
            var yy1 = pos_y[conts] + Math.sqrt(2)*0.5*stripe_length + Math.random() * (var_max_y - var_min_y) + var_min_y;      
          }
          var xx2 = xx1 + stripe_length/Math.sqrt(p**2 + 1);
          var yy2 = yy1 + (stripe_length*p)/Math.sqrt(p**2 + 1);
          var lines = lines + '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(0,0,0);stroke-width:2" />';  
         // var p = rand_occ[conts]; // left: occ
         // var p2 = rand_vis[conts]; // right: vis
          var aa2 = rand_vis[conts];
          var p2= Math.tan((aa2 * Math.PI) / 180);  
          if (aa2>80 && aa2 < 100){
            var_max_x = adjust_max; var_min_x = adjust_min; var_max_y = adjust_max; var_min_y = adjust_min;
          }  
          var xx12 = pos_x2[conts] + Math.random() * (var_max_x - var_min_x) + var_min_x; // taken from the right part
          var yy12 = pos_y[conts] + Math.random() * (var_max_x - var_min_x) + var_min_x
          if (aa2>90){
            var yy12 = pos_y[conts] + Math.sqrt(2)*0.5*stripe_length + Math.random() * (var_max_y - var_min_y) + var_min_y;      
          }
          var xx22 = xx12 + stripe_length/Math.sqrt(p2**2 + 1);
          var yy22 = yy12 + (stripe_length*p2)/Math.sqrt(p2**2 + 1);
         
          var lines2 = lines2 + '<line x1="'+xx12+'" y1="'+yy12+'" x2="'+xx22+'" y2="'+yy22+'" style="stroke:rgb(0,0,0);stroke-width:2" />';
        }
      }
    }  
  
  
  
    //The x1 attribute defines the start of the line on the x-axis
    //The y1 attribute defines the start of the line on the y-axis
    //The x2 attribute defines the end of the line on the x-axis
    //The y2 attribute defines the end of the line on the y-axis            
    // --- display the stipes & the occluder --- //
  
    var pos_occluder = 0;
    var occ_scale = 0.2;
    if (trial.occ_pos == 1){ // occluder on the right, default
        if (trial.occ_proportion== 3){
            var pos_occluder = paper_width * 2.5 + plategap*1.4; 
            var occ_scale = 0.28;
        }else if (trial.occ_proportion== 4){ //done
          var pos_occluder = paper_width * 5.49 + plategap*1; 
          var occ_scale = 0.13;
       }else if (trial.occ_proportion== 5){ // done
        var pos_occluder = paper_width * 4.2 + plategap*1.2; 
        var occ_scale = 0.17;
      }else if (trial.occ_proportion== 6){ // done
        var pos_occluder = paper_width * 3.2 + plategap*1.2; 
        var occ_scale = 0.215;
      }else if (trial.occ_proportion== 7){ // done
        var pos_occluder = paper_width * 2.65 + plategap*1.1; 
        var occ_scale = 0.26;
      }else if (trial.occ_proportion== 8){ // done
        var pos_occluder = paper_width * 2.17 + plategap*1.5; 
        var occ_scale = 0.305;
      }else if (trial.occ_proportion== 9){ // done
        var pos_occluder = paper_width * 1.92 + plategap*1.5; 
        var occ_scale = 0.346;
      }else if (trial.occ_proportion== 10){ // done
        var pos_occluder = paper_width * 1.64 + plategap*1.5; 
        var occ_scale = 0.39;
      }else if (trial.occ_proportion== 11){ // done
        var pos_occluder = paper_width * 1.43 + plategap*1; 
        var occ_scale = 0.433;
      }else if (trial.occ_proportion== 12){
        var pos_occluder = paper_width * 1.3 + plategap*1.2; 
        var occ_scale = 0.475;
      }
    }else if(trial.occ_pos == 2){ // occluder on the left, opposite to default setting
      if (trial.occ_proportion== 3){ // not used
        var pos_occluder = paper_width * 2.5 * 0.155 + plategap*36.5; 
        var occ_scale = 0.28;
      }else if (trial.occ_proportion== 4){ // done
        var pos_occluder = paper_width * 7.9* 0.155 + plategap*21; 
        var occ_scale = 0.13;
      }else if (trial.occ_proportion== 5){ // done
        var pos_occluder = paper_width *7.2* 0.155 + plategap*13.5; 
        var occ_scale = 0.17;
      }else if (trial.occ_proportion== 6){// done
        var pos_occluder = paper_width * 5 * 0.155 + plategap*10.5; 
        var occ_scale = 0.215;
      }else if (trial.occ_proportion== 7){ // done
        var pos_occluder = paper_width * 3.7 * 0.155 + plategap*6.9; 
        var occ_scale = 0.26;
      }else if (trial.occ_proportion== 8){ // done
        var pos_occluder = paper_width * 3.1 * 0.155 + plategap*6.3; 
        var occ_scale = 0.305;
      }else if (trial.occ_proportion== 9){
        var pos_occluder = paper_width * 2.46 * 0.155 + plategap*3.7; 
        var occ_scale = 0.346;
      }else if (trial.occ_proportion== 10){ // done
        var pos_occluder = paper_width * 2.3  * 0.155 + plategap*1.7; 
        var occ_scale = 0.39;
      }else if (trial.occ_proportion== 11){ // done
        var pos_occluder = paper_width * 2 * 0.162 + plategap*1.24; 
        var occ_scale = 0.433;
      }else if (trial.occ_proportion== 12){ // done
        var pos_occluder = paper_width * 1.6 * 0.153 + plategap*1.4; 
        var occ_scale = 0.475;
      }
    }
  
   
    console.log('center: '+ deg_center)
    console.log('dist: ' + deg_dist)
    console.log('occ: '+ mean_occ)
    console.log('vis: '+ mean_vis)
  
 // block 1-3
  paper.innerHTML = '<div class = "backleft">\
      <svg height="'+paper_height +'" width="'+paper_width_large+'" >\
           <defs>\
            <filter id="shadowdown1" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
            </filter>\
          </defs>\
      <rect x="'+platepos+'" y="'+platey+'" width="'+platewidth +'" height="'+plateheight+'"  fill = "white" filter= "url(#shadowdown1)" />\
     '+lines+'\
      <rect x="'+platepos2+'" y="'+platey+'" width="'+platewidth +'" height="'+plateheight+'"  fill = "white" filter= "url(#shadowdown1)" />\
     '+lines2+'\
          <defs>\
            <filter id="shadowdown" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
            </filter>\
          </defs>\
         <g  filter ="url(#shadowdown)"><image xlink:href="img/occluder_2d2.png" x = '+ pos_occluder+' y = 78  transform="scale('+occ_scale+' 0.45)" /></g>\
      </svg>\
    </div>';
  
      var start_time = Date.now();
  
    
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          clear_display();
          end_trial();
        }, trial.trial_duration);
      }
  
  
      function clear_display() {
          display_element.innerHTML = '';
        } 
}
}



  
      function end_trial() {
        jsPsych.pluginAPI.clearAllTimeouts();
          var trial_data = {
          occ_size: trial.occ_proportion,// occluded proportion
          occ_position: trial.occ_pos, //  1: occ right, vis left ; 2: occ left, vis right
          block_num: trial.block_num, // 1: ask vis, 2: ask occ, 3: ask overall, 4: ask overall(partial occ)
         };
  
        // go to next trial
        jsPsych.finishTrial(trial_data);
      }
    };
  
    // helper function for determining stimulus locations
  
    function cosd(num) {
      return Math.cos(num / 180 * Math.PI);
    }
  
    function sind(num) {
      return Math.sin(num / 180 * Math.PI);
    }
  
    return plugin;
  })();
  
