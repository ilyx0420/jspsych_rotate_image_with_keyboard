/**
 *
 * jspsych-occlusion-numerosity
 * Hui Men
 * University of Marburg
 * 08.11.2021
 *
 * Display two images containing different number of elements
 * 3 conditions are interleaved: 1) both sides are occluded 2) both sides are not occluded 3) half-half
 * 2 questions are asked after displaying the images 1) compare the numerosity 2) confidence
 *
 **/

jsPsych.plugins["visual-array-stimuli-stillimage"] = (function() {

var plugin = {};

jsPsych.pluginAPI.registerPreload('visual-array-stimuli-stillimage', 'target', 'image');
jsPsych.pluginAPI.registerPreload('visual-array-stimuli-stillimage', 'foil', 'image');
jsPsych.pluginAPI.registerPreload('visual-array-stimuli-stillimage', 'fixation_image', 'image');

plugin.info = {
  name: 'visual-array-stimuli-stillimage',
  description: '',
  parameters: {
    set_size: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Set size1',
      default: undefined,
      description: 'How many items should be displayed?'
    },

    set_size_r: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Set size2',
      default: undefined,
      description: 'How many items should be displayed?'
    },

    target_size: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Target size',
      array: true,
      default: [60, 60],
      description: 'Two element array indicating the height and width of the search array element images.'
    },
    trial_duration: {
      type: jsPsych.plugins.parameterType.INT,
      pretty_name: 'Trial duration',
      default: 250,
      description: 'The maximum duration to wait for a response.'
    },
    stimuli_type: {
      type: jsPsych.plugins.parameterType.INT,
    //pretty_name: 'colrs',
    //default: ["blue", "green"],
    //description: 'The maximum duration to wait for a response.'
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
    real_trial:{
      type: jsPsych.plugins.parameterType.INT,
    },
    frac:{
      type: jsPsych.plugins.parameterType.INT,
    },
  }
}


plugin.trial = function(display_element, trial) {


//// -------- DEFINE PAPER SIZE --------- ////
var paper_width = 390;
var paper_size = paper_width * 1.3 ; 


//// --------- NUMBER OF STIMULI --------- ////
var number_stim = trial.set_size; 
var number_stim_r = trial.set_size_r;
 
//// --------- FIX PAPER POSITION -------- ////

var bordersize = 50; 
var pos_paper_top = 0;  
var pos_paper_left = 0; 
var imagebetweengap = 20;

/*
if (trial.real_trial == 0){
  var trialtype = "catch_trial";
}else if(trial.real_trial == -1){
  var trialtype = "partial_occlude_trial";
}elsef if(trial.real_trial == 1){
  var trialtype = "real_trial";
}*/

////---------- OCCLUDER MASKS ------------ ////
var maskmat4 =[1,1,0,0,1,1,0,1,1,1,0,0,1,
               1,1,0,0,0,0,0,1,1,1,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,1,1,1,0,0,0,0,0,1,1,
               1,1,0,1,1,1,0,0,1,0,0,1,1,
               0,0,0,1,1,1,0,0,0,0,0,1,1,
               0,0,0,0,0,0,0,0,0,0,0,0,0,
               1,1,0,0,0,0,0,1,1,1,0,0,0,
               1,1,0,0,1,0,0,1,1,1,0,0,1];

var maskmat3 =[1,0,0,1,1,1,0,1,1,0,0,1,1,
               1,0,0,1,1,1,0,0,1,0,0,1,1,
               0,0,0,0,0,0,0,0,0,0,0,0,0,
               1,1,0,0,0,0,0,0,1,1,0,0,0,
               1,1,0,0,1,1,0,1,1,1,0,0,1,
               1,1,0,0,0,0,0,1,1,1,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,1,1,1,0,0,0,0,0,1,1];


var maskmat2 =[1,1,0,0,1,1,0,1,1,0,0,1,1,
               1,1,0,0,1,0,0,0,0,0,0,1,1,
               0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,1,1,0,0,0,1,1,0,0,0,
               1,0,0,1,1,1,0,1,1,1,0,0,1,
               0,0,0,1,1,0,0,0,1,1,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,
               1,1,0,0,0,0,0,0,0,0,0,1,1,
               1,1,0,0,1,1,0,1,1,0,0,1,1];

var maskmat1 = [1,0,0,1,1,1,0,1,1,1,0,0,1,
                0,0,0,1,1,0,0,0,1,1,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,
                1,1,0,0,0,0,0,0,0,0,0,1,1,
                1,1,0,0,1,1,0,1,1,0,0,1,1,
                1,1,0,0,0,0,0,0,0,0,0,1,1,
                0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,1,1,0,0,0,1,1,0,0,0,
                1,0,0,1,1,1,0,1,1,1,0,0,1];


var maskmat_small1 = [1,0,0,1,1,1,0,1,1,1,0,0,1,
                      0,0,0,1,1,0,0,0,1,1,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,0,
                      1,1,0,0,0,0,0,0,0,0,0,1,1,
                      1,1,0,0,1,1,0,1,1,0,0,1,1,
                      1,1,0,0,0,0,0,0,0,0,0,1,1,
                      0,0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,1,1,0,0,0,1,1,0,0,0,
                      1,0,0,1,1,1,0,1,1,1,0,0,1];

 var maskmat_small2 = [1,1,0,0,1,0,0,0,1,1,0,0,1,
                      1,0,0,0,0,0,0,0,1,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,1,0,0,0,0,0,0,0,1,
                      1,0,0,1,1,1,0,0,1,0,0,1,1,
                      0,0,0,0,1,0,0,0,0,0,0,0,1,
                      0,0,0,0,0,0,0,0,0,0,0,0,0,
                      1,0,0,0,0,0,0,0,1,0,0,0,0,
                      1,1,0,0,1,0,0,0,1,1,0,0,1]; 

//// ------ DECIDE WHICH CASE [NO OCCULDE / BOTH OCCLUDE / HALF-HALF] ------ ////

if (trial.condition ==1) {
  if (trial.set_size == 1){
      var disord = "occlude-1";   //median occluder
      if (trial.occ_num == 1){
        var stillim = "clr_s1_p1";
        var imtype = "oc_s1_p1";
        var maskmat = maskmat1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s1_p2";
        var imtype = "oc_s1_p2";
        var maskmat = maskmat2;
      }
  }else if (trial.set_size == 2){
     var disord = "occlude-2"; // orig median oc-occluder
        if (trial.occ_num == 1){
        var stillim = "clr_s2_p1";
        var imtype = "oc_s2_p1";
        var maskmat = maskmat1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s2_p2";
        var imtype = "oc_s2_p2";
        var maskmat = maskmat2;
      }
  }else if (trial.set_size == 3){
     var disord = "occlude-3"; // orig larger occluder
      if (trial.occ_num == 1){
        var stillim = "clr_s3_p1";
        var imtype = "oc_s3_p1";
        var maskmat = maskmat_small1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s3_p2";
        var imtype = "oc_s3_p2";
        var maskmat = maskmat_small2;
      }
  }else if (trial.set_size == 4){
     var disord = "occlude-4"; // orig median oc-occluder
        if (trial.occ_num == 1){
        var stillim = "clr_s4_p1";
        var imtype = "oc_s4_p1";
        var maskmat = maskmat1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s4_p2";
        var imtype = "oc_s4_p2";
        var maskmat = maskmat2;
      }
  }else if (trial.set_size == 5){
     var disord = "occlude-5"; // orig median oc-occluder
        if (trial.occ_num == 1){
        var stillim = "clr_s5_p1";
        var imtype = "oc_s5_p1";
        var maskmat = maskmat1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s5_p2";
        var imtype = "oc_s5_p2";
        var maskmat = maskmat2;
      }
  }else if (trial.set_size == 6){
     var disord = "occlude-6"; // orig median oc-occluder
        if (trial.occ_num == 1){
        var stillim = "clr_s6_p1";
        var imtype = "oc_s6_p1";
        var maskmat = maskmat1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s6_p2";
        var imtype = "oc_s6_p2";
        var maskmat = maskmat2;
      }
  }else if (trial.set_size == 7){
     var disord = "occlude-7"; // orig median oc-occluder
        if (trial.occ_num == 1){
        var stillim = "clr_s7_p1";
        var imtype = "oc_s7_p1";
        var maskmat = maskmat1;
        }else if (trial.occ_num ==2){
        var stillim = "clr_s7_p2";
        var imtype = "oc_s7_p2";
        var maskmat = maskmat2;
      }
  }
}else if (trial.condition == 2){

  if (trial.set_size == 1){
        var disord = "nocclude-1";   //median occluder
        if (trial.occ_num == 1){
          var stillim = "clr_s1_p1";
          var imtype = "noc_s1_p1";
          var maskmat = maskmat1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s1_p2";
          var imtype = "noc_s1_p2";
          var maskmat = maskmat2;
        }
    }else if (trial.set_size == 2){
       var disord = "nocclude-2"; // orig median oc-occluder
          if (trial.occ_num == 1){
          var stillim = "clr_s2_p1";
          var imtype = "noc_s2_p1";
          var maskmat = maskmat1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s2_p2";
          var imtype = "noc_s2_p2";
          var maskmat = maskmat2;
        }
    }else if (trial.set_size == 3){
       var disord = "nocclude-3"; // orig larger occluder
        if (trial.occ_num == 1){
          var stillim = "clr_s3_p1";
          var imtype = "noc_s3_p1";
          var maskmat = maskmat_small1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s3_p2";
          var imtype = "noc_s3_p2";
          var maskmat = maskmat_small2;
        }
    }else if (trial.set_size == 4){
       var disord = "nocclude-4"; // orig median oc-occluder
          if (trial.occ_num == 1){
          var stillim = "clr_s4_p1";
          var imtype = "noc_s4_p1";
          var maskmat = maskmat1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s4_p2";
          var imtype = "noc_s4_p2";
          var maskmat = maskmat2;
        }
    }else if (trial.set_size == 5){
       var disord = "nocclude-5"; // orig median oc-occluder
          if (trial.occ_num == 1){
          var stillim = "clr_s5_p1";
          var imtype = "noc_s5_p1";
          var maskmat = maskmat1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s5_p2";
          var imtype = "noc_s5_p2";
          var maskmat = maskmat2;
        }
    }else if (trial.set_size == 6){
       var disord = "nocclude-6"; // orig median oc-occluder
          if (trial.occ_num == 1){
          var stillim = "clr_s6_p1";
          var imtype = "noc_s6_p1";
          var maskmat = maskmat1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s6_p2";
          var imtype = "noc_s6_p2";
          var maskmat = maskmat2;
        }
    }else if (trial.set_size == 7){
       var disord = "nocclude-7"; // orig median oc-occluder
          if (trial.occ_num == 1){
          var stillim = "clr_s7_p1";
          var imtype = "noc_s7_p1";
          var maskmat = maskmat1;
          }else if (trial.occ_num ==2){
          var stillim = "clr_s7_p2";
          var imtype = "noc_s7_p2";
          var maskmat = maskmat2;
        }
    }

}

if (disord == "fake"){
  var stillim = "clr_grid1new";
  var occtype = "oc6";
  var notype = "noc6";
}




//// ------- DECIDE WHICH OCCLUDER MASK TO USE --------- ////

/*
var randmask = Math.random();
var randmask = 0.1;

if (randmask < 1/4 ){
    var bubccc = 1;
    var occtype = "occ_shade1";
    var notype = "ncc_shade1";
    var maskmat = maskmat1;
  }else if (randmask >= 1/4 && randmask < 2/4){
    var bubccc = 2;
    var occtype = "oc2";
    var notype = "noc2";
    var maskmat = maskmat2;
  }
else if (randmask >= 2/4 && randmask < 3/4){
    var bubccc = 3;
    var occtype = "oc3";
    var notype = "noc3";
    var maskmat = maskmat3;
}else if (randmask >= 3/4 && randmask <= 1){
    var bubccc = 4;
    var occtype = "oc4";
    var notype = "noc4";
    var maskmat = maskmat4;
}
*/


/////// ---------- FIX POSITIONS OF TWO IMAGES ---------- //////

  var pos_leftpaper_top =  0  ;  
  var pos_leftpaper_left = 0;// + paper_width * 0.5 + imagebetweengap;

  var pos_rightpaper_top = 0 ; 
  var pos_rightpaper_left = 0;//- paper_width * 0.5 - imagebetweengap; 

  var maskwidth = paper_width - 2 * bordersize;
  var maskheight = paper_size - 1.5 * bordersize;



///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////STIMULI GRIDS/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


var targetgrid = trial.target_size[0] * 1.47 ;
var col = 9;//Math.floor(maskwidth / targetgrid );
var row = 13;//Math.floor(maskheight / targetgrid );
var totalnum = col * row;
var possible_grids = [];
for (var i = 0; i < col ; i++){
  for (var j = 0; j < row ; j++){
      possible_grids.push([i * (targetgrid+0.45)  + pos_rightpaper_left + imagebetweengap + bordersize  + 0.3 *trial.target_size[0], j * targetgrid + pos_rightpaper_top + bordersize* 0.45 + 0.5*trial.target_size[0]])
    }
}

var display_x = [];
var display_y = [];
var display_locs_x =[];
var display_locs_y =[];
var display_locs_r_x =[];
var display_locs_r_y =[];
var display_or_not = [];

for (var m = 0; m < totalnum; m++){
  display_x.push(possible_grids[m][0]);
  display_y.push(possible_grids[m][1]);
  display_or_not.push(maskmat[m]);
}


///// ------- LOCATION OF STIMULI IN DIFFERENT CASES -------/////
var aa = [];
for (var i = 0; i < totalnum; i++) {
   aa.push(i);
}


if (disord == "hybrid-occludleft" || disord =="hybrid-occludright"){
      var randaa = jsPsych.randomization.sampleWithoutReplacement(aa,aa.length) ;
    ///LEFT 
      var visistim = 0;
      var displaynum = 0;
      while (visistim < number_stim){
        var b = randaa[displaynum]; 
       //var b = aa[displaynum]; 
        if (display_or_not[b]==1){
          display_locs_x.push(display_x[b] - 1* trial.target_size[0]);
          display_locs_y.push(display_y[b] + 1 * trial.target_size[0]);
          visistim += 1;
        }
        displaynum += 1;
      }
    /// RIGHT
      ///***********************NO OCCLUSION PART START***************************///

      if (disord == "hybrid-occludright"){
      /// ------- OCCLUSION RIGHT - NO OCCLUSION LEFT -------
      var lrx = 0  + paper_width * 1 +  imagebetweengap * 1 - 0 * trial.target_size[0] ;  
      }else{
      /// ------- OCCLUSION LEFT - NO OCCLUSION RIGHT -------
      var lrx = - paper_width  - imagebetweengap * 1 - 2 * trial.target_size[0] ; 
      }
      var randaa_r = jsPsych.randomization.sampleWithoutReplacement(aa,aa.length) ;
      var visistim_r = 0;
      var displaynum_r = 0;
      while (visistim_r < number_stim_r){
        var br = randaa_r[displaynum_r]; 
       // var br = aa[displaynum_r]; 
        if (display_or_not[br]==1){
          display_locs_r_x.push(display_x[br] + lrx);
          display_locs_r_y.push(display_y[br] + 1 * trial.target_size[0]);
          visistim_r += 1;
        }
        displaynum_r += 1;
      }
    }else if (disord == "both-occlude"){
                  //-----DISPLAY ON THE LEFT ----
      var randaa = jsPsych.randomization.sampleWithoutReplacement(aa,aa.length) ;
      var visistim = 0;
      var displaynum = 0;
      while (visistim < number_stim){
          var b = randaa[displaynum]; 
        if (display_or_not[b]==1){
          display_locs_x.push(display_x[b] -1 * trial.target_size[0] + 1);
          display_locs_y.push(display_y[b] + 1 * trial.target_size[0]);
          visistim += 1;
        }
         displaynum += 1;
      }
                  //-----DISPLAY ON THE RIGHT ------ 
      var randaa_r = jsPsych.randomization.sampleWithoutReplacement(aa,aa.length) ;
      var visistim_r = 0;
      var displaynum_r = 0;
      while (visistim_r < number_stim_r){
        var br = randaa_r[displaynum_r]; 
      //  var br = aa[displaynum_r]; 
        if (display_or_not[br]==1){
          display_locs_r_x.push(display_x[br] + paper_width + imagebetweengap * 1 + 0 * trial.target_size[0]);
          display_locs_r_y.push(display_y[br] + 1 * trial.target_size[0]);
          visistim_r += 1;
        }
        displaynum_r += 1;
      }
    }else{//(disord == "both-no"){
      ///// -------------DISPLAY ON THE LEFT ------ 
      var randaa = jsPsych.randomization.sampleWithoutReplacement(aa,aa.length) ;
      var visistim = 0;
            var displaynum = 0;
            while (visistim < number_stim){
            //  var b = aa[displaynum]; 
              var b = randaa[displaynum]; 
               if (display_or_not[b]==1){
                display_locs_x.push(display_x[b] - 1 * trial.target_size[0] +1);
                display_locs_y.push(display_y[b]  + 1 * trial.target_size[0]);
                visistim += 1;
              }
              displaynum += 1;
            }
            /////// ---------- DISPLAY ON THE RIGHT ------- 
      var randaa_r = jsPsych.randomization.sampleWithoutReplacement(aa,aa.length) ;
      var visistim_r = 0;
            var displaynum_r = 0;
            while (visistim_r < number_stim_r){
              var br = randaa_r[displaynum_r]; 
               if (display_or_not[br]==1){
                display_locs_r_x.push(display_x[br] + paper_width + imagebetweengap * 1 + 0 * trial.target_size[0]);
                display_locs_r_y.push(display_y[br] + 1 * trial.target_size[0]);
                visistim_r += 1;
              }
              displaynum_r += 1;
      }
}

///*************************************************************************///
///*************************************************************************///
///*************************************************************************///
///*************************************************************************///
///***********************NO OCCLUSION PART END*****************************///
///*************************************************************************///
///*************************************************************************///
///*************************************************************************///
///*************************************************************************///
var paper_width_new = paper_width * trial.frac;
var paper_size_new = paper_size * trial.frac;

 
display_element.innerHTML += '<div id="jspsych-visual-search-circle-container" style= "position: relative; width:' + paper_width_new + 'px; height:' + paper_size_new + 'px; top:'+ pos_paper_top + 'px; left:' + pos_paper_left + 'px;"></div>';
 
var paper = display_element.querySelector("#jspsych-visual-search-circle-container");

/*
var elments = [];
if (trial.stimuli_type == 0){
  for (var i = 0; i<12; i++){
  elments.push("circle_db");elments.push("circle_bb");
  }
}else{
  for (var i = 0; i<12; i++){
  elments.push("colornewest1");elments.push("colornewest2");
  }
}*/

var elments = [];
if (trial.stimuli_type == 0){
  for (var i = 0; i<200; i++){
  elments.push("sq2");elments.push("sq4");
  }
}else{
  for (var i = 0; i<200; i++){
  elments.push("colornewest1");elments.push("colornewest2");
  }
}


var to_present = [];
var to_present_f =[];
for (var ss=0; ss < number_stim; ss++){
   to_present_f.push(elments[ss]);
}
var to_present = jsPsych.randomization.sampleWithoutReplacement(to_present_f, to_present_f.length);

var to_present_r = [];
var to_present_r_f = [];
for (var ss=0; ss < number_stim_r; ss++){
   to_present_r_f.push(elments[ss]);
}
var to_present_r = jsPsych.randomization.sampleWithoutReplacement(to_present_r_f, to_present_r_f.length);



var dff = display_locs_y.length - display_locs_r_y.length; 
if (dff > 0){
  for (var tt = 0; tt < dff; tt++){
    display_locs_r_x.push(0 + paper_width * 0.473); 
    display_locs_r_y.push(0);
    to_present_r.push("graydark"); 
    } 
} 
if (dff < 0){
  for (var tt = 0; tt < -dff ; tt++){
    display_locs_x.push(0 + paper_width * 0.473);
    display_locs_y.push(0);
    to_present.push("graydark"); 
    }
}




///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--DISPLAY-**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////
///////**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**--**///////

show_search_array();

function show_search_array() {


    var disstr=" "
    for (var i = 0; i < Math.max(display_locs_y.length, display_locs_r_y.length); i++ ){
      disstr +='<img class = "imagesub" src="img/'+ to_present[i]+'.png" style="--imsub_postop:'+ display_locs_y[i]+'px; --imsub_posleft:'+ display_locs_x[i]+'px; width:'+trial.target_size[0]+'px; height:'+trial.target_size[1]+'px;">';
    } 
/*
    if (disord == "hybrid-occludright" || disord == "hybrid-occludleft"){
      paper.innerHTML = '<div class = "backleft">\
      <img class = "imageleft" src="img/'+ occtype + '.png" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width  + 'px; height:' + paper_size + 'px;">\
      <img class = "imageleft" src="img/'+ notype +'.png" style = "--imleft_posleft:'+ pos_rightpaper_left + 'px; --mask_postop: '+ pos_rightpaper_top +'px; width:'+ paper_width +'px; height:' + paper_size + 'px; ">\
      '+disstr+'</div>';
    }else if (disord == "both-occlude"){
      paper.innerHTML = '<div class = "backleft">\
      <img class = "imageleft" src="img/'+ occtype +'.png" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width  + 'px; height:' + paper_size + 'px;">\
      <img class = "imageleft" src="img/'+ occtype + '.png" style = "--imleft_posleft:'+ pos_rightpaper_left + 'px; --mask_postop: '+ pos_rightpaper_top +'px; width:'+ paper_width +'px; height:' + paper_size + 'px; ">\
      '+disstr+'</div>';
    }else if (disord == "both-no"){
      paper.innerHTML = '<div class = "backleft">\
      <img class = "imageleft" src="img/'+ notype +'.png" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width  + 'px; height:' + paper_size + 'px;">\
      <img class = "imageleft" src="img/'+ notype +'.png" style = "--imleft_posleft:'+ pos_rightpaper_left + 'px; --mask_postop: '+ pos_rightpaper_top +'px; width:'+ paper_width +'px; height:' + paper_size + 'px; ">\
      '+disstr+'</div>';
    }else if(disord =="test"){
      paper.innerHTML = '<div class = "backleft">\
      <img class = "imageleft" src="img/'+ occtype +'.png" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width  + 'px; height:' + paper_size + 'px;">\
      <img class = "imageleft" src="img/'+ notype +'.png" style = "--imleft_posleft:'+ pos_rightpaper_left + 'px; --mask_postop: '+ pos_rightpaper_top +'px; width:'+ paper_width +'px; height:' + paper_size + 'px; ">\
      </div>';
    }
*/
      paper.innerHTML = '<div class = "backleft">\
      <img class = "imstyle1" src="img/'+ stillim + '.png" style = "--imleft_posleft:'+pos_leftpaper_left+'px;  --imleft_postop:'+ pos_leftpaper_top +'px; width:' + paper_width_new  + 'px; height:' + paper_size_new + 'px;">\
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


    function end_trial() {
      jsPsych.pluginAPI.clearAllTimeouts();

      // data saving

      if (disord == "hybrid-occludleft"){
        var trial_data = {
        set_size: trial.set_size,
      //  set_size_r: trial.set_size,
      trialtype: trial.real_trial, //trialtype,
        display_type: "left_occlude; right_no",
          //  trialtype: trial.real_trial,//trialtype,
       // locations_r: [display_locs_x,display_locs_y] ,
       // locations_l: [display_locs_r_x,display_locs_r_y],
       // colours_r: to_present,
       // colours_l: to_present_r
         }
      }else if (disord == "hybrid-occludright"){
        var trial_data = {
        set_size: trial.set_size,
      //  set_size_r: trial.set_size_r,
      trialtype: trial.real_trial, //trialtype,
        display_type: "left_no; right_occlude",
        //    trialtype: trial.real_trial,//trialtype,
        }
     }else{
        var trial_data = {
        set_size: trial.set_size,
      //  set_size_r: trial.set_size_r,
        trialtype: trial.real_trial, //trialtype,
        display_type: disord,
        scale_frac: trial.frac,
       //   trialtype: trial.real_trial,//trialtype,
       // locations_l: [display_locs_x,display_locs_y] ,
       // locations_r: [display_locs_r_x,display_locs_r_y],
       // colours_l: to_present,
       // colours_r: to_present_r
       }
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
