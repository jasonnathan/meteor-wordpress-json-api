##meteor-wordpress-dev-api##
============================
A quick fork of Ronaldo Barbachano's [redcap3000:wordpress-json-api](https://atmospherejs.com/redcap3000/wordpress-json-api) specifically for WordPress.com's API

Interacts with the [Wordpress.com Developer API](https://developer.wordpress.com/docs/api/) to retrieve [Wordpress.com](http://wordpress.com) data.

##Usage##
============================
Comes with very bare bones templates and sends back all the data/fields to all publications. Includes a basic template with single post view functionality (as well as a way to go back.)
###Quickstart

**HTML Template File that references built in template 'wordpress_posts'**

***main.html***

```
<head>
  <title>testWordpress</title>
</head>

<body>
{{>wordpress_posts}}
</body>
```
**Client JS file that sets session variable used to fetch wordpress posts**
**main.js**

```
if (Meteor.isClient) {
  // Internally, it constructs the URL by prefixing https://public-api.wordpress.com/rest/v1.1/sites/
  Session.setDefault("wp-json-api-url","mysite.wordpress.com/posts");
}
```
Changing the Session variable ```wp-json-api-url``` will update the subscription with the new data (if applicable.)

###Bring your own template


```
Meteor.subscribe("wordpress","mysite.wordpress.com/posts/7/replies");
```


1. Subscribe to data that is available via global mongo collection Wordpress

2. Use built in global handlebar helper ```wpPosts``` to iterate through data in Wordpress mongo collection


```
{{#each wpPosts}}
  {{{content}}}
{{/each}}
```


Make your own structures/queries  by directly accessing the Wordpress collection

```
Wordpress.find();

```

Publications
===============
```
Meteor.publish("wordpress",function(site, queryHash))
```
The main publication where `site` is the wordpress.com siteID or url including the primary content to retrieve
`mysite.wordpress.com/posts` and `queryHash` is an object of query parameters to include. 
@see Methods below for an example

```
Meteor.publish("wpPost",function(slug){})
```

This may not play nice with use of the "main" wordpress publication. So its recommended using one or the other.
###Methods

```
Meteor.call("callWordpress","mysite.wordpress.com");
Meteor.call("callWordpress","mysite.wordpress.com/posts",{
    number: 10, //The number of posts to return. Limit: 100. Default: 20.
    page: 1 //Return the Nth 1-indexed page of posts. Takes precedence over the offset parameter.
});
```
This is like the publication except it returns the raw response (as an object). Check [WordPress.com's API docs](https://developer.wordpress.com/docs/api/) for more on how to query the api.** 

####Handlebar helper

**wpPost** - use this helper to fetch the data from the collection wordpress, if provided with an ID should only return a single post of that ID. **{{wpPost slug}}**


###Extra notes
The wordpress slug is used as the mongo _id.
Subscriptions return all fields to the client.
