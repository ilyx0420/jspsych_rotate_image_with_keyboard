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
  }
}

plugin.trial = function(display_element, trial) {



/// **********************setting the square matrix**********************************///
//// default settings: stripe matrix: occluded part(0) first, then visible part(1)

var p_occ = trial.occ_proportion ; // proportion of occluded area
var p_vis = 1-p_occ; // proportion of visibla area


var stimuli_gap = 20;
var num_height = 20; // rows of stripes  
var num_width = 38; // columns of stripes
var stripe_length = 10; // length of the stripe

var cont = -1;
var pos_x = [];
var pos_y = [];
var circlemat = [];

var cont_o = -1;
var cont_v = -1;

if (trial.occ_pos == 1){ // occluder on the left
  for(let i = 0; i < num_height; i++) {
      circlemat[i] = [];
      for(let j = 0; j < Math.round(num_width*p_occ); j++) { // occluded part (0)
          cont = cont + 1;
          cont_o = cont_o +1;
          circlemat[i][j] = 0;
          pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 16; //0.5*Math.sqrt(2)*stripe_length +
          pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 10;
      }
      for(let j = Math.round(num_width*p_occ); j < num_width; j++) { // visilbe part(1)
          cont = cont + 1 ;
          cont_v = cont_v + 1;
          circlemat[i][j] = 1;
          pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 16;
          pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 10;
      }
  }
}else if (trial.occ_pos == 2){
  for(let i = 0; i < num_height; i++) {
    circlemat[i] = [];
    for(let j = 0; j < Math.round(num_width*p_vis); j++) { // visible part (1)
        cont = cont + 1;
        cont_v = cont_v + 1;
        circlemat[i][j] = 1;
        pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 16;
        pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 10;
    }
    for(let j = Math.round(num_width*p_vis); j < num_width; j++) { //occluded part(0)
        circlemat[i][j] = 0;
        cont = cont + 1;
        cont_o = cont_o + 1;
        pos_y[cont] = i*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 16;
        pos_x[cont] = j*stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 10 ;
    }
 }
}


///*******************determin the orientations of two parts**************************///
var stddev = 0.3;
var mean_occ = 0.5; // mean of the occluded part
var mean_vis = -0.5; // mean of the visible part

var list_vis=[];
//for(var n = 0; n< Math.round(num_width*num_height*p_vis); n++){
for(var n = 0; n<= cont_v; n++){
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    list_vis.push(z0 * stddev + mean_occ)
}

var list_occ=[];
//for(var n = 0; n<Math.round(num_width*num_height*p_occ); n++){
for(var n = 0; n<=cont_o; n++){
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    list_occ.push(z0 * stddev + mean_vis)
}


///******************************************************************///         
///******************************************************************///
///*****************DIESPLAY THE STIMULI*****************************///

//// -------- DEFINE PAPER SIZE --------- ////
var pos_paper_top = 0;//- 0.5*Math.sqrt(2)*stripe_length + 10;  
var pos_paper_left = 0;//- 0.5*Math.sqrt(2)*stripe_length + 10; 

var paper_width = num_width * stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 25;  
var paper_height = num_height * stimuli_gap + 0.5*Math.sqrt(2)*stripe_length + 25;

display_element.innerHTML += '<div id="jspsych-visual-search-circle-container" style= "position: relative; width:' + paper_width + 'px; height:' + paper_height + 'px; top:'+ pos_paper_top + 'px; left:' + pos_paper_left + 'px;"></div>';
 
var paper = display_element.querySelector("#jspsych-visual-search-circle-container");

show_search_array();

function show_search_array() {
  // --- randonmize the orientations --- // 
  var rand_vis = jsPsych.randomization.sampleWithoutReplacement(list_vis,list_vis.length) ;
  var rand_occ = jsPsych.randomization.sampleWithoutReplacement(list_occ,list_occ.length) ;

  // --- determine the striipes --- //
  var lines = '';
  var conts = -1;
  var cont_vis = -1;
  var cont_occ = -1;

  for (var i = 0 ; i< num_height;  i++){
    for (var j = 0 ; j< num_width;  j++){
      conts = conts+1;
      var xx1 = pos_x[conts];
      var yy1 = pos_y[conts];   
    
    if ( circlemat[i][j] == 1){ // visible part, default on the right
        cont_vis = cont_vis+1;
        var p = rand_vis[cont_vis];
        //var p = 0;
        var xx2 = xx1 + stripe_length/Math.sqrt(p**2 + 1);
        var yy2 = yy1 + (stripe_length*p)/Math.sqrt(p**2 + 1);
        var lines = lines + '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(255,0,0);stroke-width:2" />';
    }
    else if (circlemat[i][j] == 0){ // occluded part, default on the left
        cont_occ = cont_occ +1;
        var p = rand_occ[cont_occ];
        //var p = 0;
        var xx2 = xx1 + stripe_length/Math.sqrt(p**2 + 1);
        var yy2 = yy1 + (stripe_length*p)/Math.sqrt(p**2 + 1);
        var lines = lines +  '<line x1="'+xx1+'" y1="'+yy1+'" x2="'+xx2+'" y2="'+yy2+'" style="stroke:rgb(0,255,0);stroke-width:2" />';
    }
  }
}
  //The x1 attribute defines the start of the line on the x-axis
  //The y1 attribute defines the start of the line on the y-axis
  //The x2 attribute defines the end of the line on the x-axis
  //The y2 attribute defines the end of the line on the y-axis            
  // --- display the stipes & the occluder --- //

//var occ_pos = 2; //'right';
var platewidth = paper_width -15 //;+20;
var plateheight = paper_height - 15;
var platepos = 5;
var platey = 6;


if (trial.occ_pos == 1){ // occluder on the left, default
    var pos_occluder = 74;
    // set stripe positions

}else if(trial.occ_pos == 2){ // occluder on the right, opposite to default setting
    var pos_occluder = 594;
}
/* ------ use svg occluder (old version) --- /
paper.innerHTML = '<div class = "backleft">\
    <svg height="'+paper_height +'" width="'+paper_width+'" >\
         <defs>\
          <filter id="blur-out">\
            <feDropShadow dx="0" dy="0" stdDeviation="4.5"\
                flood-color="black"/>\
          </filter>\
        </defs>\
     <rect x="'+platepos+'" y="'+platey+'" width="'+platewidth +'" height="'+plateheight+'"  fill = "white" filter= "url(#blur-out)" />\
    '+lines+'\
        <defs>\
          <filter id="blur-out">\
            <feDropShadow dx="0" dy="0" stdDeviation="4.5"\
                flood-color="black"/>\
          </filter>\
        </defs>\
     <rect x="'+pos_occluder+'" width="'+5*stimuli_gap+'" height="'+num_height*stimuli_gap*1.1+'"  fill = "cyan" filter= "url(#blur-out)" />\
    </svg>\
  </div>';
*/

// --- use a 3D occluder --- 
paper.innerHTML = '<div class = "backleft">\
    <svg height="'+paper_height +'" width="'+paper_width+'" >\
         <defs>\
          <filter id="shadowdown1" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
          </filter>\
        </defs>\
     <rect x="'+platepos+'" y="'+platey+'" width="'+platewidth +'" height="'+plateheight+'"  fill = "white" filter= "url(#shadowdown1)" />\
    '+lines+'\
        <defs>\
          <filter id="shadowdown" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
          </filter>\
        </defs>\
        <g  filter ="url(#shadowdown)" ><image xlink:href="img/occluder_3d2.png" x = '+pos_occluder+' height = 100% /></g>\
    </svg>\
  </div>';


// ****** remove occluder to see clearly ****** //
/*
paper.innerHTML = '<div class = "backleft">\
    <svg height="'+paper_height +'" width="'+paper_width+'" >\
         <defs>\
          <filter id="shadowdown1" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
          </filter>\
        </defs>\
     <rect x="'+platepos+'" y="'+platey+'" width="'+platewidth +'" height="'+plateheight+'"  fill = "white" filter= "url(#shadowdown1)" />\
    '+lines+'\
        <defs>\
          <filter id="shadowdown" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />\
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\
          </filter>\
        </defs>\
        <g  filter ="url(#shadowdown)" ><image xlink:href="img/occluder_3d2.png" x = '+pos_occluder+' height = 100% /></g>\
    </svg>\
  </div>';
*/

// ---------------------------------------------// 




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


    function end_trial() {
      jsPsych.pluginAPI.clearAllTimeouts();

      // data saving

        var trial_data = {
        set_size: trial.set_size,//trial.set_size,
        vis_area: trial.occ_num,
        //vis_proportion: numss,
        //set_size_r: number_stim_r,//trial.set_size_r,
      //  trialtype: trial.real_trial, //trialtype,
       // display_type: disord,
       // locations_l: [display_locs_x,display_locs_y] ,
       // locations_r: [display_locs_r_x,display_locs_r_y],
       // colours_l: to_present,
       // colours_r: to_present_r
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
