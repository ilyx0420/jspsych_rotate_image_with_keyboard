/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response-modi'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response-modi',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 117,
        description: 'Sets the maximum value of the slider',
      },
      slider_start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 58,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }




  plugin.trial = function(display_element, trial) {

    // half of the thumb width value from jspsych.css, used to adjust the label positions
    var maxnum = 117;

    var half_thumb_width = 7.5; 

    var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
    html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + '</div>';
    html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
    if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    } else {
      html += 'width:auto;';
    }
    html += '">';
    html += '<input type="range" class="jspsych-slider" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" oninput="this.nextElementSibling.value = this.value" id="jspsych-html-slider-response-response"> <input disabled style="width: 24px;" placeholder = "58"  id = "nid"></input>';
    



    html += '<div>'

  /*  for(var j=0; j < trial.labels.length ; j++){
      var label_width_perc = 100/(trial.labels.length-1 ); // label text width
      var percent_of_range = j * (100/(trial.labels.length - 1 )); // don't change
      var percent_dist_from_center = ((percent_of_range-50)/50)*117;
      var offset = (percent_dist_from_center * half_thumb_width)/100;
      html += '<div style="border: 1px solid transparent; display: inline-block; position: absolute; '+
      'left:calc('+percent_of_range+'% - ('+label_width_perc+'% / 2) - '+offset+'px); text-align: center; width: '+label_width_perc+'%;">';  
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }
   */

//var pos = 43; // stops at 50 100 117
var pos = 34.4; // stops at 40 80
//var pos = 33.4; // stops at 39 78

   ///// lable 1
   var label_width_perc = 40;
   var percent_of_range = pos * 0; 
   var percent_dist_from_center = ((percent_of_range-50)/50)*117;
   var offset = (percent_dist_from_center * half_thumb_width)/100;
   html += '<div style="border: 1px solid transparent; display: inline-block; position: absolute; '+
      'left:calc('+percent_of_range+'% - ('+label_width_perc+'% / 2) - '+offset+'px); text-align: center; width: '+label_width_perc+'%;">';  
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[0]+'</span>';
      html += '</div>'
   ///// lable 2
   var label_width_perc = 40;
   var percent_of_range = pos * 1; 
   var percent_dist_from_center = ((percent_of_range-50)/50)*117;
   var offset = (percent_dist_from_center * half_thumb_width)/100;
   html += '<div style="border: 1px solid transparent; display: inline-block; position: absolute; '+
      'left:calc('+percent_of_range+'% - ('+label_width_perc+'% / 2) - '+offset+'px); text-align: center; width: '+label_width_perc+'%;">';  
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[1]+'</span>';
      html += '</div>'
   ///// lable 3
   var label_width_perc = 40;
   var percent_of_range = pos * 2 ; 
   var percent_dist_from_center = ((percent_of_range-50)/50)*117 ;
  // var offset = (percent_dist_from_center * half_thumb_width)/100 ; // starts at 50 100
   var offset = (percent_dist_from_center * half_thumb_width)/100 + 1; // starts at 40, 80 & 39, 78
   html += '<div style="border: 1px solid transparent; display: inline-block; position: absolute; '+
      'left:calc('+percent_of_range+'% - ('+label_width_perc+'% / 2) - '+offset+'px); text-align: center; width: '+label_width_perc+'%;">';  
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[2]+'</span>';
      html += '</div>'

   ///// lable 4
   var label_width_perc = 40;
   //var percent_of_range = pos*2 + 15; // stops at 50 100
   var percent_of_range = pos*2 + 31.3; // stops at 40 80
  // var percent_of_range = pos*2 + 33.1; // stops at 39 78


   var percent_dist_from_center = ((percent_of_range-50)/50)*117;
   var offset = (percent_dist_from_center * half_thumb_width)/100;
   html += '<div style="border: 1px solid transparent; display: inline-block; position: absolute; '+
      'left:calc('+percent_of_range+'% - ('+label_width_perc+'% / 2) - '+offset+'px); text-align: center; width: '+label_width_perc+'%;">';  
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[3]+'</span>';
      html += '</div>'

/////////


    html += '</div>';
    html += '</div>';
    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';

    display_element.innerHTML = html;

    var response = {
      rt: null,
      response: null
    };

    if(trial.require_movement){
      display_element.querySelector('#jspsych-html-slider-response-response').addEventListener('click', function(){
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = false;
      });
    }

    display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
      // measure response time
      var endTime = performance.now();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-html-slider-response-response').valueAsNumber;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = true;
      }

    });

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        rt: response.rt,
      //  stimulus: trial.stimulus,
        slider_start: trial.slider_start,
        response_value: response.response,
        scale_frac: 0
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = performance.now();
  };

  return plugin;
})();
