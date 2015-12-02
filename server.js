Meteor.methods({
    /**
     * @param string site your blog URL and optionally the content to retrieve "myblog.wordpress.com/posts"
     * @param object [queryHash = {}] An object containing query params 
     */
    'callWordpress': function (site, queryHash) {

        site = site ? "https://public-api.wordpress.com/rest/v1.1/sites/" + site : undefined;
        queryHash = queryHash || {};


        if (!site)
            return {
                error: 401,
                message: "Bad Request: Required parameter `site` is " + site.toString()
            };

        var q = HTTP.get(site, {
            headers: {
                "Accept": "application/json"
            },
            data: queryHash
        });

        if (q.statusCode === 200) {
            var respJson = JSON.parse(q.content);
            return respJson;
        }

        return {
            error: q.statusCode
        };
    }
});

Meteor.publish("wordpress", function (site, directive) {

    site = site ? "https://public-api.wordpress.com/rest/v1.1/sites/" + site : undefined;
    queryHash = queryHash || {};


    if (!site)
        return false;

    var q = HTTP.get(site, {
        headers: {
            "Accept": "application/json"
        },
        data: queryHash
    });

    if (q.statusCode === 200) {
        var respJson = JSON.parse(q.content);
        if (respJson && typeof respJson.posts != "undefined") {
            respJson.posts.filter(function (arr) {
                Wordpress[ !!Wordpress.findOne(arr.slug) ? 'upsert' : 'insert' ](arr)
            });
            return Wordpress.find();
        } else {
            this.ready();
        }
    } else {
        this.ready();
        return {
            error: q.statusCode
        };
    }

    this.ready();
});

Meteor.publish("wpPost", function (slug) {
    return Wordpress.find(String(slug));
});