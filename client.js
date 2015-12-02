Meteor.startup(function () {
    typeof Session !== "undefined" && Session.setDefault('wp-site-id', false);
});

Handlebars.registerHelper("wpPosts", function (id) {
    // must provide own sub.. useful for custom templates
    if (typeof id == "undefined")
        return Wordpress.find();
    else
        return Wordpress.find({
            _id: id
        });
});

Template.wordpress_posts.onCreated(function () {
    // optional if one choses to use included templates.
    var self = this;
    self.autorun(function () {
        if (!Session.equals('wp-site-id', false)) {
            self.subscribe("wordpress", Session.get("wp-site-id"));
        }
    });
});