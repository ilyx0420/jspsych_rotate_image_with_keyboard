/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-keyboard-response-dropdown"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-keyboard-response-dropdown',
    description: '',
    parameters: {
        questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'The strings that will be associated with a group of options.'
          },
          options: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Options',
            array: true,
            default: undefined,
            description: 'Displays options for an individual question.'
          },
          required: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Required',
            default: false,
            description: 'Subject will be required to pick an option for each question.'
          },
          horizontal: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Horizontal',
            default: false,
            description: 'If true, then questions are centered and options are displayed horizontally.'
          },
          name: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Question Name',
            default: '',
            description: 'Controls the name of data values associated with this question'
          }
        }
      },
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEY,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
    /*  prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },*/
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
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '<div id="jspsych-html-keyboard-response-stimulus">'+trial.stimulus+'</div>';
   //  html = '';
    // inject CSS for trial
    html += '<style id="jspsych-survey-dropdown-css">';
    html += ".jspsych-survey-dropdown-question { margin-top: 2em; margin-bottom: 2em; text-align: left; }"+
      ".jspsych-survey-dropdown-text span.required {color: darkred;}"+
      ".jspsych-survey-dropdown-horizontal .jspsych-survey-dropdown-text {  text-align: center;}"+
      ".jspsych-survey-dropdown-option { line-height: 2; }"+
      ".jspsych-survey-dropdown-horizontal .jspsych-survey-dropdown-option {  display: inline-block;  margin-left: 1em;  margin-right: 1em;  vertical-align: top;}"+
      "label.jspsych-survey-dropdown-text input[type='radio'] {margin-right: 1em;}";
    html += '</style>';
    html += '<form id="jspsych-survey-dropdown-form">';
    // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
    // so that the data are always associated with the same question regardless of order
    var question_order = [];
    for(var i=0; i<trial.questions.length; i++){
      question_order.push(i);
    }
    if(trial.randomize_question_order){
      question_order = jsPsych.randomization.shuffle(question_order);
    }
    // add multiple-choice questions
    for (var i = 0; i < trial.questions.length; i++) {
      // get question based on question_order
      var question = trial.questions[question_order[i]];
      var question_id = question_order[i];
      // create question container
      var question_classes = ['jspsych-survey-dropdown-question'];
      if (question.horizontal) {
        question_classes.push('jspsych-survey-dropdown-horizontal');
      }
      html += '<div id="jspsych-survey-dropdown-'+question_id+'" class="'+question_classes.join(' ')+'"  data-name="'+question.name+'">';
      // add question text
      html += '<p class="jspsych-survey-dropdown-text survey-dropdown">' + question.prompt
      if(question.required){
        html += "<span class='required'>*</span>";
      }
      html += '</p>';
      var required_attr = question.required ? 'required' : '';
      // label for dropdown menu
     // html += '<label for="jspsych-survey-dropdown-question-options">Choose an option: </label>';
      html += '<label for="jspsych-survey-dropdown-question-options">Choose a number: </label>';
      var input_name = 'jspsych-survey-dropdown-response-'+question_id;
      // add dropdown
      html += '<select name="'+ input_name +'" id="'+ input_name +'"'+required_attr+'>';
      html += '<option value="" id="null">Please select</option>';
      for (var j = 0; j < question.options.length; j++) {
        // add label and question text
        var option_id_name = "jspsych-survey-dropdown-option-"+question_id+"-"+j;
        // var input_id = 'jspsych-survey-dropdown-response-'+question_id+'-'+j;
        html += '<option value="'+ question.options[j] +'" id="'+option_id_name+'">'+question.options[j]+'</option>';
      }

      html += '</select>';
      html += '</div>';
    }

    // add prompt
    if(trial.prompt !== null){
      html += trial.prompt;
    }

    // draw
    display_element.innerHTML = html;

    // store response
    var response = {
      rt: true,//null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      //var trial_data = {
       // rt: response.rt,
        //stimulus: trial.stimulus,
        //response: response.key
      //};


      var endTime = performance.now();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      for(var i=0; i<trial.questions.length; i++){
        // get question based on question_order
        var question_id = question_order[i];

        var match = display_element.querySelector('#jspsych-survey-dropdown-'+i);
        var id = "Q" + i;
        //AN added this
        var input_name = 'jspsych-survey-dropdown-response-'+question_id;
        if(match.querySelector('#'+input_name+' option:checked') !== null){
          var val = match.querySelector('#'+input_name+' option:checked').value;
        } else {
          var val = "";
        }
        var obje = {};
        var name = id;
        if(match.attributes['data-name'].value !== ''){
          name = match.attributes['data-name'].value;
        }
        obje[name] = val;
        Object.assign(question_data, obje);
      }
      // save data
      var trial_data = {
        "rt": response_time,
        "dropdown-responses": JSON.stringify(question_data),
        "question_order": JSON.stringify(question_order)
      };


      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
     // if (response.key == null) {
       // response = info;
     // }

     // if (trial.response_ends_trial) {
        end_trial();
      //}
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
