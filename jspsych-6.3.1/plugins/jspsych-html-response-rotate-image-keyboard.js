/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-response-rotate-image-keyboard'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-response-rotate-image-keyboard',
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
        default: 360,
        description: 'Sets the maximum value of the slider',
      },
      slider_start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 180,
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
      condition:{
        type: jsPsych.plugins.parameterType.INT,
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // half of the thumb width value from jspsych.css, used to adjust the label positions
    var half_thumb_width = 7.5; 

    var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';

/// ------ rotate the image
html += '<div id="myDIV" style="position: relative; top: -50px"><img src="img/stick.png" height="150" width="20"></div>'; //rotate the image


  if (trial.condition == 0){
    html += '<div id="jspsych-html-slider-response-stimulus"><div style="width:700px;"><p>What is the average direction overall?</p></div></div>';
  }else if (trial.condition == 1){
    html += '<div id="jspsych-html-slider-response-stimulus"><div style="width:700px;"><p>What is the average direction of the left part?</p></div></div>';
  }else if (trial.condition == 2){
    html += '<div id="jspsych-html-slider-response-stimulus"><div style="width:700px;"><p>What is the average direction of the right part?</p></div></div>';
  }
    html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
   /* if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    } else {
      html += 'width:auto;';
    } */
    html += '">';
   // html += '<input type="range" class="jspsych-slider" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" oninput="this.nextElementSibling.value = this.value '+ -180 +'" id="jspsych-html-slider-response-response"><input disabled style="width: 26px;" placeholder = "0"  id = "nid"></input>';
    
    //html+= '<p id="jspsych-html-slider-response-response">Press <kbd>r</kbd> to rotate.</p>'
     html+= '<p id="jspsych-html-slider-response-response">Press "RightArrow" to rotate clockwise. Press "LeftArrow" to rotate counter clockwise.</p>'

    html += '<div>'
    html += '</div>';
    html += '</div>';
    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';
   // html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn">'+trial.button_label+'</button>';

    display_element.innerHTML = html;

    var response = {
      rt: null,
      response: null
    };




   var count = 0;
   document.addEventListener('keydown', function(event){
    //console.log(event);    
      if (event.key == "ArrowRight") {
          count++;
      }else if (event.key == "ArrowLeft"){
          count--;
      }
      slider_value = count;
      document.getElementById("myDIV").style.transform = "rotate("+slider_value+"deg)"; // give input value to rotate the image
  
   
      if (event.key == "ArrowRight" || event.key == "ArrowLeft"){
         display_element.querySelector('#jspsych-html-slider-response-next').disabled = false;
      }

  }); 

// ------------------------------------------------------------------------------------------

document.body.style.overflow = 'hidden';

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
       // stimulus: trial.stimulus,
        //slider_start: trial.slider_start,
       // response: response.response,
        degree:slider_value,
        testt: 1000
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
