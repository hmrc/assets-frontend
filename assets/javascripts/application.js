/**
 * DOM ready
 */
$(document).ready(function () {
    GOVUK.preventDoubleSubmit();
    //initialise stageprompt for Analytics
    //TODO: Enable once we set up Goggle Analytics
    //GOVUK.performance.stageprompt.setupForGoogleAnalytics();

    // toggle for reporting a problem (on all content pages)
    $('.report-error__toggle').on('click', function (e) {
        $('.report-error__content').toggleClass('js-hidden');
        e.preventDefault();
    });

    //feedback forms require a hidden field denoting if javascript is enabled

    var $feedbackForms = $('.form--feedback'),
        $errorReportForm = $('.report-error__content form');
    //we have javascript enabled so change hidden input to reflect this
    $feedbackForms.find('input[name="isJavascript"]').attr("value", true);

    //Initialise validation for the feedback form
    $errorReportForm.validate({
        errorClass: 'error-notification',
        errorPlacement: function (error, element) {
            error.insertBefore(element);
        },
        //Highlight invalid input
        highlight: function (element, errorClass) {
            $(element).parent().addClass('form-field--error');
        },
        //Unhighlight valid input
        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass('form-field--error');
        },
        //When all fields are valid perform AJAX call
        submitHandler: function (form) {
            GOVUK.ReportAProblem.submitForm(form, $errorReportForm.attr("action"));
        }
    });


    $('.print-link a').attr('target', '_blank');

    var $searchFocus = $('.js-search-focus');
    if ($searchFocus.val() !== '') {
        $searchFocus.addClass('focus');
    }
    $searchFocus.on('focus', function (e) {
        $(e.target).addClass('focus');
    });
    $searchFocus.on('blur', function (e) {
        if ($searchFocus.val() === '') {
            $(e.target).removeClass('focus');
        }
    });
    if (window.location.hash && $(".design-principles").length !== 1 && $('.section-page').length !== 1) {
        GOVUK.contentNudge(window.location.hash);
    }
    $("nav").delegate('a', 'click', function () {
        var hash;
        var href = $(this).attr('href');
        if (href.charAt(0) === '#') {
            hash = href;
        } else if (href.indexOf("#") > 0) {
            hash = "#" + href.split("#")[1];
        }
        if ($(hash).length === 1) {
            $("html, body").animate({
                scrollTop: $(hash).offset().top - $("#global-header").height()
            }, 10);
        }
    });

    // hover, active and focus states for buttons in IE<8
    if (!$.support.leadingWhitespace) {
        $('.button').not('a')
            .on('click focus', function () {
                $(this).addClass('button-active');
            })
            .on('blur', function () {
                $(this).removeClass('button-active');
            });
        $('.button')
            .on('mouseover', function () {
                $(this).addClass('button-hover');
            })
            .on('mouseout', function () {
                $(this).removeClass('button-hover');
            });
    }

    if ($("*[data-contextual-helper]").length) {
        // setup showing/hiding of contextual fields
        GOVUK.toggleContextualFields.setup();
    }

    GOVUK.toggleDynamicFormFields();
    //TODO: replace toggleDynamicFormField usage in all exemplars and rename this function
    GOVUK.simpleToggleDynamicFormFields();
    GOVUK.questionnaireSubmission();
    GOVUK.registerBlockInputFields( '#form-end-journey-questionnaire' );
    GOVUK.registerCharacterCountFields();
});