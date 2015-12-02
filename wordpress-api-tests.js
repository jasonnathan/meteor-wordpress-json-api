Session.set('wp-site-id', 'buffalochronicle.com/posts');

Tinytest.add('Check Session is set', function (test) {
    test.equal(Session.get('wp-site-id'), 'buffalochronicle.com/posts', 'Expected session variable to equal: ' + 'en.blog.wordpress.com');
});

Tinytest.addAsync("Publication-wordpress returns an array", function (test, ready) {
    var sub1 = Meteor.subscribe("wordpress", Session.get('wp-site-id'));
    Tracker.autorun(function (comp) {
        if (sub1.ready()) {
            var posts = Wordpress.find().fetch();
            test.isTrue(typeof posts !== 'array', "Querying the collection should return an array");
            test.isTrue(posts.length > 1, "Querying the collection should not return an empty aray");
            comp.onStop(function () {
                Meteor.defer(ready);
            });
            comp.stop();
        }
    });
});

Tinytest.addAsync("Publication-wpPost returns a single post", function (test, ready) {
    var postId = "chris-jacobs-says-fuck-poor-people";
    var sub2 = Meteor.subscribe("wpPost", Session.get('wp-site-id') + '/' + postId);
    Tracker.autorun(function (comp) {
        if (sub2.ready()) {
            var post = Wordpress.findOne(postId);
            test.equal(post.slug, post._id, "Retrieved post's mongo id must be the post's slug");

            comp.onStop(function () {
                Meteor.defer(ready);
            });
            comp.stop();
        }
    });
});