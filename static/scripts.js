$(function() {

    $(document).click(function(event) {
        if ($(event.target).closest(".hide_active").length) return;
        $(".hide_active").removeClass("active");
        event.stopPropagation();
    });


    $(".pop .close, .pop_login .close").click(function() {
        $(this).parent().toggleClass("active");
        return false;
    });

    $(".menu_collapse").click(function() {
        $(".menu").toggleClass("active");
        return false;
    });

    $("[data-js-headauth]").click(function() {
        $(".pop_login").toggleClass("active");
        return false;
    });

    $(document).on('click', ".tabs li", (function() {
        $(".tabs li").removeClass("active");
        var i = $(this).attr("data-tab");
        $(this).addClass("active");
        $(".tab_group").slideUp();
        $("[data-tab-group=" + i + "]").slideDown();
        return false;
    }));


});
